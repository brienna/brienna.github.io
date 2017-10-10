---
layout: post
title: "Present and future state of cloud computing"
date: 2017-09-26
comments: true
---

*I wrote this paper for an assignment in the course ISTE-605: Scholarship in Information Sciences and Technologies. The objectives in doing this assignment were to develop and apply literature search skills, and to gain initial experience in paraprashing and use of in-text citations. To fulfill these objectives, I developed a list of 15 references that for cloud computing, (a) identified and discussed open issues, challenges, and opportunities, (b) presented the state of the practice, and (c) were representative of the state of the art. Then, based on the references I selected, I wrote a short paper that presents my prediction for the evolution of cloud computing over the next five years.* 

## Present and future state of cloud computing

Cloud computing is an integration of existing technologies to move data away from the desktop and into data centers, or into the “cloud.” The biggest disruptive trend over the past decade, cloud computing is now maturing, and it has the potential within the next five years to become an expected part in everyday computing, given that the largest pressing issues such cloud interoperability and security are addressed.

As of 2017, the state of the practice in cloud computing is highly diverse. Out of 700 respondents to a recent survey by Cloudify (2017), 57 percent use cloud computing in various branches of the computer industry; 17 percent in telecommunication; 5 percent in government and academia; 7 percent in financial services and insurance; and 14 percent in other industries such as media, healthcare, retail, defense, and the Internet. The respondents came from organizations ranging in size from 1 employee to over 10,000. Their choices of cloud vendors ranged widely, with OpenStack, AWS, VMware, Azure, and Google Cloud others among the most common. Uses of cloud computing are various, some being infrastructure and platform, test and development environment, file storage, disaster recovery, backup, and big data analytics (Ferkoun, 2014).

While highly diverse, the state of the practice is also rapidly evolving. The public cloud market is predicted to yield $236 billion in revenue by 2020 (Bartels et al., 2016), up from $58 billion in 2013 (Bartels et al., 2014). When cloud computing first emerged, uncertainties surrounding the new trend prevented some clients, particularly larger businesses, from adopting the cloud, but those concerns moderated as time passed, and the demographic of clients has shifted from mostly start-ups and mid-sized businesses to include an influx of larger businesses, the influx more rapid than predicted (Brinda & Heric, 2017). As Cappuccio (2015) reports, businesses have stopped asking whether they should use cloud computing. They are now asking *how* they can leverage the technology. 

Cloud computing is evolving more rapidly than predicted, but the technology is still immature. According to Brinda and Heric (2017), businesses have not yet leveraged the cloud to drive innovation; 90 percent of current cloud use is from new clients adopting the cloud and older clients maintaining their clouds. For cloud computing to change how computing is done by becoming part of everyday computing, the technology needs to evolve more.

One of the biggest issues affecting the future of cloud computing is cloud interoperability (Ardagna, 2015; Cretella & Di Martino, 2015; Gracia-Tinedo et al., 2017; Kostoska, Gusev, & Ristov, 2016; Opara-Martins, Sahandi, & Tian, 2016), which is the ability to easily move data from one cloud vendor to another. Since each vendor’s cloud environment has its own interface and tools, migrating data between vendors involves costs and complexities that may slow down a customer’s performance and innovation, or trap the customer with one vendor, a situation known as “vendor lock-in” (Opara-Martins et al., 2016). Customers want the freedom to move from vendor to vendor as their needs change, and that isn’t currently possible.

A solution to the issue of cloud interoperability is to develop and implement open standards. There have been many efforts toward this. In one such effort, Gracia-Tinedo et al. (2017) proposed a protocol called *DataWings* that standardizes storage APIs and user authentication management. In another effort, Cretella and DiMartino (2015) proposed a “mOSAIC” engine to standardize graphical representations of the user services that each vendor provides. Despite efforts such as these, no official open standards have been agreed upon yet, as there are too many pieces of the cloud to standardize, and cloud vendors are reluctant to cooperate with the efforts, instead preferring to seek profit from vendor lock-ins (Opara-Martins et al., 2016).

Due to the absence of open standards, it is possible the next five years will see an increase in multi-cloud usage, an alternative solution. By deploying over multiple clouds, clients can avoid vendor lock-in (Ardagna, 2015). A recent survey by Cloudify (2017) reported that close to half of its 700 respondents are using at least two cloud vendors, with nine percent using as many as five vendors or more. This multi-cloud strategy seems like it will continue to rise in popularity. Cappuccio (2015) predicts that 70 percent of businesses will be using multiple clouds by 2019, up from less than 10 percent in 2015. 

In addition to cloud interoperability, cloud security is a big issue affecting the future of cloud computing (Rad, Diaby, & Rana, 2017; Ouedraogo, Mignon, Cholez, Furnell, & Dubois, 2015; Chhabra & Dixit, 2015). Entrusting centralized data centers with data normally stored on the desktop raised concerns that, with the maturation of cloud computing, have moderated, shifted, or created further concerns (Brinda & Heric, 2017; Smith, 2017). The top security threats currently are “data breaches; data loss; account hijacking; insecure APIs; denial of service; malicious insiders; abuse of cloud services; insufficient due diligence; shared technology issues; weak identity, and credential and access management; system and application vulnerabilities; and advanced persistent threats” (Top Threats Working Group, 2016). As evidenced by this list of threats, cloud security is a big—and broad—issue. 

Much of the state of the art research directly addresses these top threats. For example, LeJeune, Tunstall, Yang, and Alkadi (2016) propose two algorithms, MIST and Malachi, to strengthen security against threats of account hijacking, weak identity, and credential and access management. The algorithms do this task by helping to reduce security vulnerabilities caused by the users themselves, such as weak passwords or security questions. As another example, Ennajjar, Tabii, and Benkaddour (2017) propose a data processing model that reduces the threat of data breaches. Their model categorizes data before it gets encrypted, so that different algorithms can be used to encrypt the data from different categories, taking into consideration different levels of sensitivity. 

If the issues of cloud security and interoperability continue to be addressed as they have been in the state of the art research, it is likely that in the next five years the rapid growth of cloud computing can be sustained, allowing the technology to mature and settle into its place in everyday computing.  

## References

Ardagna, D. (2015). Cloud and multi-cloud computing: Current challenges and future applications. 7th International Workshop on Principles of Engineering Service-Oriented and Cloud Systems (2015 IEEE/ACM), 1-2. https://doi.org/10.1109/PESOS.2015.8

Bartels, A., Bartoletti, D., Rymer, J. R., Mines, C., Cser, A., Hanson, M., . . . McPherson, I. (2016, September). The public cloud services market will grow rapidly to $236 billion in 2020: 2020 sizing forecast shows strong growth, but with signs of maturity on the horizon. Retrieved from Forrester website: https://www.forrester.com/report/The+Public+Cloud+Market+Is+Now+In+Hypergrowth/-/E-RES113365

Bartels, A., Rymer, J. R., Staten, J., Kark, K., Clark, J., & Whittaker, D. (2014, April). The public cloud market is now in hypergrowth: Sizing the public cloud market, 2014 to 2020. Retrieved from Forrester website: https://www.forrester.com/report/The+Public+Cloud+Market+Is+Now+In+Hypergrowth/-/E-RES113365

Brinda, M., & Heric, M. (2017, January 25). The changing faces of the cloud. Bain Brief. Retrieved from http://www.bain.com/publications/articles/the-changing-faces-of-the-cloud.aspx

Cappuccio, D. J. (2015, June). The future of the data center in the cloud era. Retrieved from Gartner website: https://www.gartner.com/doc/3079122?ref=unauthreader&srcId=1-4730952011

Chhabra, S., & Dixit, V. S. (2015). Cloud computing: State of the art and security issues. ACM SIGSOFT Software Engineering Notes, 40(2), 1-11. https://doi.org/10.1145/2735399.2735405

Cretella, G., & Di Martino, B. (2015). A semantic engine for porting applications to the cloud and among clouds. Software: Practice and Experience, 45, 1619-1647. https://doi.org/10.1002/spe.2304

Ennajjar, I., Tabii, Y., & Benkaddour, A. (2017). Securing data in cloud computing by classification. Proceedings of the 2nd International Conference on Big Data, Cloud and Applications (BDCA'17), (Article No.: 49). https://doi.org/10.1145/3090354.3090404

Ferkoun, M. (2014, February 6). Top 7 most common uses of cloud computing [Blog post]. Retrieved from https://www.ibm.com/blogs/cloud-computing/2014/02/top-7-most-common-uses-of-cloud-computing/
 
Gracia-Tinedo, R., Cotes, C., Zamora-Gomez, E., Ortiz, G., Moreno-Martinez, A., Sanchez-Artigas, M., . . . Illana, A. (2017). Giving wings to your data: A first experience of personal cloud interoperability. Future Generation Computer Systems, 78, 1055-1070. https://doi.org/10.1016/j.future.2017.01.027

Kostoska, M., Gusev, M., & Ristov, S. (2016). An overview of cloud interoperability. Proceedings of the 2016 Federated Conference on Computer Science and Information Systems (FedCSIS), 8, 873-876. https://doi.org/10.15439/2016F463

LeJeune, J., Tunstall, C., Yang, K.-P., & Alkadi, I. (2016). An algorithmic approach to improving cloud security: The MIST and Malachi algorithms. 2016 IEEE Aerospace Conference, 1-7. https://doi.org/10.1109/AERO.2016.7500522

Opara-Martins, J., Sahandi, R., & Tian, F. (2016). Critical analysis of vendor lock-in and its impact on cloud computing migration: A business perspective. Journal of Cloud Computing: Advances, Systems and Applications, 5(4), 1-18. https://doi.org/10.1186/s13677-016-0054-z

Ouedraogo, M., Mignon, S., Cholez, H., Furnell, S., & Dubois, E. (2015). Security transparency: The next frontier for security research in the cloud. Journal of Cloud Computing, 4(12), 1-14. https://doi.org/10.1186/s13677-015-0037-5

Rad, B. B., Diaby, T., & Rana, M. E. (2017). Cloud computing adoption: A short review of issues and challenges. Proceedings of the 2017 International Conference on E-commerce, E-Business and E-Government (ICEEG 2017), 51-55. https://doi.org/10.1145/3108421.3108426

Smith, D. M. (2017, January). Cloud computing primer for 2017. Retrieved from Gartner website: https://www.gartner.com/doc/3570517/cloud-computing-primer-

Top Threats Working Group. (2016, February). The treacherous 12: Cloud computing top threats in 2016. Retrieved from Cloud Security Alliance website: https://downloads.cloudsecurityalliance.org/assets/research/top-threats/Treacherous-12_Cloud-Computing_Top-Threats.pdf

2017 state of enterprise multi-cloud: Managing the fragmented cloud world. (2017). Retrieved from Cloudify website: http://wp.cloudify.co/wp-content/uploads/2017/09/2017-State-of-Enterprise-Multi-Cloud-Report.pdf

