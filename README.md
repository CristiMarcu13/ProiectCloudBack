# ProiectCloud

Cloud Computing
Marcu Cristian


Pentru dezvoltarea acestui proiect am participat la laboratoare si am parcurs clipurile si is resursele puse la dispozitie pe platforma. Scopul aplicatiei este de a utiliza mai multe API uri si servicii cloud, precum Sendgrid si Cloud Translation API. Proiectul nu este finalizat, dar functionalitatea APIurilor mentionate anterior este utilizata si prezentata in cele de mai jos.
Am utilizat Cloud Translation API, un api din cadrul platformei Google Cloud. Acesta permite recunoasterea de text, recunoasterea cu acuratete a limbii textului respective si traducerea acestuia in alte limbi specificate. Pentru utilizareea acestuia este nevoie de un cont cu o subscriptie active la Google Cloud, intr-u cat serviciul nu este gratuit. Integrarea in aplicatie se face printr-o cheie private generata pe platforma.
![image](https://user-images.githubusercontent.com/104891420/168491047-56a2ee26-0813-4eda-9cc3-7cc19ccfecc4.png)

 
Un alt API utilizat a fost Sendgrid, un API care permite expedierea automata de mailuri. Acesta este gratuit pentru utilizarea obijnuita, dar are si functionalitati premium cu taxa de subscriptie. Similar cu apiul de mai sus, se genereaza o cheie private cu ajutorul careia conectam API ul la aplicatia noastra. Aici eu am gresit si am publicat din greseala cheia mea private in GIT, motiv pentru care contul meu de Sendgrid a fost temporar suspendat si a trebuit sat rec prin niste pasi pentru a putea sa il recuperez.
![image](https://user-images.githubusercontent.com/104891420/168491062-36bc68e8-07ea-4c31-a634-6264207eee21.png)


Datele sunt inserate in baza de date prin backend prin requesturi PUT SI POST. In cadrul proiectului a fost utilizat Postman pentu crearea de requesturi POST, PUT, GET DELETE. 

![image](https://user-images.githubusercontent.com/104891420/168491067-f0051429-dc14-472e-b1aa-39371398f4fa.png)


Datele sunt persistate intr o instana de baza de date SQL aflata in google cloud. Acestea pot fi manipulate de utilizator prin intermediul front-endului.
 
![image](https://user-images.githubusercontent.com/104891420/168491072-39aa282c-c532-4b70-9259-abec28468906.png)
![image](https://user-images.githubusercontent.com/104891420/168491077-63946083-7896-470f-a4bc-17de93736746.png)
![image](https://user-images.githubusercontent.com/104891420/168491080-07f5cbfc-0479-4382-b618-372e2096aded.png)

 
 

In fina, pentru ca aplicatia sa poata fi acceesata de oricina aceasta trebuie publicata pe internet. Acest lucru se poate face pe un server fizic sau se poate face in cloud. Un astfel de serviciu de hostare in cloud este Heroku. Acesta pune la dispozitia noastra o masina virtuala in care sa ne putem hosta atat partea de backend cat si partea de front end, astfel este vorba de o solutie de tip PaaS.

In continuare voi prezenta mai multe requesturi/responseuri cu poze din Postman:
![image](https://user-images.githubusercontent.com/104891420/168491084-df0c5501-c019-4754-a722-6bdb345c9659.png)
![image](https://user-images.githubusercontent.com/104891420/168491087-5e4cf50a-bed6-4a5e-96a1-050136e5b90a.png)
![image](https://user-images.githubusercontent.com/104891420/168491091-1a799a65-a2db-414a-8b45-858867ca59e6.png)
       

Din pacate, in dezvoltarea proiectului am intampinat erori, de la versiunea de node pe care am instalat o pana la banarea contului de sendgrid. Pentru partea de deploy in Heroku, am reusit sa fac dedployul dar procesul de build a dat urmatoarele erori pe care nu le am putut rezolva:
Backend:
![image](https://user-images.githubusercontent.com/104891420/168491096-b546dd0b-0d45-44e2-bc69-42a4d520062a.png)

 
Frontend:
![image](https://user-images.githubusercontent.com/104891420/168491102-066623ff-fc52-409b-a723-e6c5b94de445.png)

 

De asemenea am intampinat o eroare pe care nu am putut sa o identific in frontend la MessagesList.jsx. Nu am reusit deloc sa aduc in frontend intararile din baza de date.

Frontend:
![image](https://user-images.githubusercontent.com/104891420/168491136-f82836af-3386-4888-a063-28a1a4dc4940.png)
Backend:
![image](https://user-images.githubusercontent.com/104891420/168491140-ef3f8b38-365c-485d-af29-59ae7abe7849.png)







