---
layout: post
title: "How to bulk access arXiv full-texts"
date: 2018-06-08
comments: true
---

Since its inception in 1991, arXiv, the main database for scientific preprints, has received almost [1.3 million submissions](https://arxiv.org/help/stats/2017_by_area/index). All of this data can be useful in analysis, so we may want to be able to access the full-texts in bulk. This post goes over how we can do this using Python 3 and the command line. 

## Steps for bulk accessing full-texts using the command line

Although the data is sitting right there on the server, it is [not recommended to crawl arXiv directly]](https://arxiv.org/help/robots) due to limited server capacity. However, arXiv has acknowledged the demand for bulk access by [making all full-texts available on Amazon S3](https://arxiv.org/help/bulk_data_s3), with monthly updates. 

arXiv stores their source files in the `arxiv` bucket. The requester has to pay. The data is in big tar files ordered by date (the last modification time of that file). This is kind of inconvenient, because we will need to process the entire arXiv corpus even if we are only interested in a specific category. 

Below we will go over the steps to download the full-texts, targeting the `astro-ph` category. 

### 1. Set up an AWS account. 

To be able to download anything from Amazon S3, you need an Amazon Web Services (AWS) account. Sign up [here](https://portal.aws.amazon.com/billing/signup). You'll have to register a credit card.

### 2. Create your configuration file. 

Create a file named `config.ini` and add your AWS configs:

```python
[DEFAULT]
ACCESS_KEY = access-key-value
SECRET_KEY = secret-key-value
```

To get your key values, follow the directions [here](https://www.cloudberrylab.com/blog/how-to-find-your-aws-access-key-id-and-secret-access-key-and-register-with-cloudberry-s3-explorer/) for root access keys. 

Do not make this file public. 

### 3. Create S3 resource & set configs.

Create a Python file that you'll run from the command line. In it, initialize a S3 resource, which is an object-oriented interface to the service, and configure it to use your root access.

```python
import boto3, configparser

s3resource = None

def setup():
    """Creates S3 resource & sets configs to enable download."""

    print('Connecting to Amazon S3...')

    # Securely import configs from private config file
    configs = configparser.SafeConfigParser()
    configs.read('config.ini')

    # Create S3 resource & set configs
    global s3resource
    s3resource = boto3.resource(
        's3',  # the AWS resource we want to use
        aws_access_key_id=configs['DEFAULT']['ACCESS_KEY'],
        aws_secret_access_key=configs['DEFAULT']['SECRET_KEY'],
        region_name='us-east-1'  # same region arxiv bucket is in
    )

if __name__ == '__main__':
    """Runs if script is called on command line"""

    # Create S3 resource & set configs
    setup()
```

### 4. Check `arxiv` bucket metadata.

arXiv maintains useful information about the data in their bucket in a file called `src/arXiv_src_manifest.xml`. Download this file to better understand what we're working with. 

```python
import boto3, configparser, os, botocore

def download_file(key):
    """
    Downloads given filename from source bucket to destination directory.

    Parameters
    ----------
    key : str
        Name of file to download
    """

    # Ensure src directory exists 
    if not os.path.isdir('src'):
        os.makedirs('src')

    # Download file
    print('\nDownloading s3://arxiv/{} to {}...'.format(key, key))

    try:
        s3resource.meta.client.download_file(
            Bucket='arxiv', 
            Key=key,  # name of file to download from
            Filename=key,  # path to file to download to
            ExtraArgs={'RequestPayer':'requester'})
    except botocore.exceptions.ClientError as e:
        if e.response['Error']['Code'] == "404":
            print('ERROR: ' + key + " does not exist in arxiv bucket")

if __name__ == '__main__':
    """Runs if script is called on command line"""

    # Download manifest file to current directory
    download_file('src/arXiv_src_manifest.xml')
```

*Note: The code will only show new or changed sections relevant to the current step, but the Python file contains code from all steps up to this one. The full file will be shown at the end.*

Explore the bucket metadata in the manifest file. 

```python
from bs4 import BeautifulSoup

def explore_metadata():
    """Explores arxiv bucket metadata."""

    print('\narxiv bucket metadata:')

    with open('src/arXiv_src_manifest.xml', 'r') as manifest:
        soup = BeautifulSoup(manifest, 'xml')

        # Print last time the manifest was edited
        timestamp = soup.arXivSRC.find('timestamp', recursive=False).string
        print('Manifest was last edited on ' + timestamp)

        # Print number of files in bucket
        numOfFiles = len(soup.find_all('file'))
        print('arxiv bucket contains ' + str(numOfFiles) + ' tars')

        # Print total size
        total_size = 0
        for size in soup.find_all('size'):
            total_size = total_size + int(size.string)
        print('Total size: ' + str(total_size/1000000000) + ' GB')

    print('')

if __name__ == '__main__':
    """Runs if script is called on command line"""

    # Explore bucket metadata 
    explore_metadata()
```

When we run this code, we'll see when the manifest file was last updated, along with how many tar files the `arxiv` bucket holds and the total size. When I ran this code (on June 10, 2018), the bucket contained 1,910 tars that were 924 GB in size. 

### 5. Download `astro-ph` source files!

Remember that each tar contains nested tar gzs, which in turn contain the source files from a specific category. While we must download each tar, we can extract these source files without the overhead of unzipping all of the tars and tar gzs. We will also screen the source files to only extract those labelled with the `astro-ph` category. 


```python
import json
from datetime import datetime

def begin_download():
    """Sets up download of tars from arxiv bucket."""

    print('Beginning tar download & extraction...')

    # Create a reusable Paginator
    paginator = s3resource.meta.client.get_paginator('list_objects_v2')

    # Create a PageIterator from the Paginator
    page_iterator = paginator.paginate(
        Bucket='arxiv',
        RequestPayer='requester',
        Prefix='src/'
    )

    # Download and extract tars
    numFiles = 0
    for page in page_iterator:
        numFiles = 0
        for page in page_iterator:
            numFiles = numFiles + len(page['Contents'])
            for file in page['Contents']:
                key = file['Key']
                # If current file is a tar
                if key.endswith('.tar'):
                    download_file(key)
            
    print('Processed ' + str(numFiles - 1) + ' tars')  # -1 

if __name__ == '__main__':
    """Runs if script is called on command line"""

    # Begin tar download & extraction 
    begin_download()
```

## Full code

```python
import boto3, configparser, os, botocore, json
from bs4 import BeautifulSoup
from datetime import datetime

s3resource = None

def setup():
    """Creates S3 resource & sets configs to enable download."""

    print('Connecting to Amazon S3...')

    # Securely import configs from private config file
    configs = configparser.SafeConfigParser()
    configs.read('config.ini')

    # Create S3 resource & set configs
    global s3resource
    s3resource = boto3.resource(
        's3',  # the AWS resource we want to use
        aws_access_key_id=configs['DEFAULT']['ACCESS_KEY'],
        aws_secret_access_key=configs['DEFAULT']['SECRET_KEY'],
        region_name='us-east-1'  # same region arxiv bucket is in
    )

def download_file(key):
    """
    Downloads given filename from source bucket to destination directory.

    Parameters
    ----------
    key : str
        Name of file to download
    """

    # Ensure src directory exists 
    if not os.path.isdir('src'):
        os.makedirs('src')

    # Download file
    print('\nDownloading s3://arxiv/{} to {}...'.format(key, key))

    try:
        s3resource.meta.client.download_file(
            Bucket='arxiv', 
            Key=key,  # name of file to download from
            Filename=key,  # path to file to download to
            ExtraArgs={'RequestPayer':'requester'})
    except botocore.exceptions.ClientError as e:
        if e.response['Error']['Code'] == "404":
            print('ERROR: ' + key + " does not exist in arxiv bucket")

def explore_metadata():
    """Explores arxiv bucket metadata."""

    print('\narxiv bucket metadata:')

    with open('src/arXiv_src_manifest.xml', 'r') as manifest:
        soup = BeautifulSoup(manifest, 'xml')

        # Print last time the manifest was edited
        timestamp = soup.arXivSRC.find('timestamp', recursive=False).string
        print('Manifest was last edited on ' + timestamp)

        # Print number of files in bucket
        numOfFiles = len(soup.find_all('file'))
        print('arxiv bucket contains ' + str(numOfFiles) + ' tars')

        # Print total size
        total_size = 0
        for size in soup.find_all('size'):
            total_size = total_size + int(size.string)
        print('Total size: ' + str(total_size/1000000000) + ' GB')

    print('')

def begin_download():
    """Sets up download of tars from arxiv bucket."""

    print('Beginning tar download & extraction...')

    # Create a reusable Paginator
    paginator = s3resource.meta.client.get_paginator('list_objects_v2')

    # Create a PageIterator from the Paginator
    page_iterator = paginator.paginate(
        Bucket='arxiv',
        RequestPayer='requester',
        Prefix='src/'
    )

    # Download and extract tars
    numFiles = 0
    for page in page_iterator:
        numFiles = numFiles + len(page['Contents'])
        for file in page['Contents']:
            key = file['Key']
            # If current file is a tar
            if key.endswith('.tar'):
                download_file(key)
            
    print('Processed ' + str(numFiles - 1) + ' tars')  # -1 

if __name__ == '__main__':
    """Runs if script is called on command line"""

    # Create S3 resource & set configs
    setup()

    # Download manifest file to current directory
    download_file('src/arXiv_src_manifest.xml')

    # Explore bucket metadata 
    explore_metadata()

    # Begin tar download & extraction 
    begin_download()
```


















