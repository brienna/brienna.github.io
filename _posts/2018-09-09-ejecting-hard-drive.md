---
layout: post
title: "Resolving MacOS error \"The disk couldn't be ejected because one or more programs may be using it.\""
date: 2018-09-09
comments: true
---

When attempting to eject an external hard drive using MacOS, sometimes we get the error *The disk "[EXTERNAL_HARD_DRIVE_NAME]" couldn't be ejected because one or more programs may be using it. To eject the disk immediately, click the Force Eject button.*

Only we don't always know *which* programs are using the drive. 

Open Terminal and enter `lsof | grep /Volumes/[EXTERNAL_HARD_DRIVE_NAME]`. 

We should get a list that looks like this:

```
photoanal 30331 Brienna  txt       REG               1,12      32768   194381 /Volumes/BRIENNAKH/Photos Library 3.photoslibrary/private/com.apple.photoanalysisd/GraphService/PhotosGraph/photosgraph.graphdb-shm
photoanal 30331 Brienna    3u      REG               1,12    1892352   194380 /Volumes/BRIENNAKH/Photos Library 3.photoslibrary/private/com.apple.photoanalysisd/GraphService/PhotosGraph/photosgraph.graphdb
photoanal 30331 Brienna    4u      REG               1,12          0   194382 /Volumes/BRIENNAKH/Photos Library 3.photoslibrary/private/com.apple.photoanalysisd/GraphService/PhotosGraph/photosgraph.graphdb-wal
photoanal 30331 Brienna    5u      REG               1,12      32768   194381 /Volumes/BRIENNAKH/Photos Library 3.photoslibrary/private/com.apple.photoanalysisd/GraphService/PhotosGraph/photosgraph.graphdb-shm
```

These are the programs that are using the hard drive. We need to quit or kill them before we can eject the hard drive safely. 

We can quit most programs normally, but some programs need to be killed via the Terminal. To do this, enter `kill [PROGRAM ID]`. In the list above, the ID is the number after the program name. So `kill 30331`. 

But the photoanalysis daemon usually withstands death via Terminal. (I have a Photos library on the drive and photoanalysis is a process associated with Photos.) Looking at questions other people have posted online regarding this issue, it seems like the best solution is to force kill it via Activity Monitor. 

An interesting read: [Does it really matter if you pull a USB out before it safely ejects?](https://www.sciencealert.com/does-it-matter-if-you-pull-a-usb-without-waiting-for-it-to-safely-eject) 
I'm often guilty of just yanking the USB out, but I'm more hesistant to do so with my hard drive, since it's the main backup for my MacBook.