Artization
 
This is the project for Artization. The purpose of this project is to transform the way 
organisations, galleries, and the art business see the affective
resonance that their products, items, and artworks have on the people who engage with
them. Here, curators hope to gain a better understanding of their patrons' interests by
visualising user interaction data with gallery artwork.
 
It has 2 main folders. The client and the server directories.
 
Installation
 
Before any devolopment use "npm install" for the dependencies.
 
In addtion, there needs to be a file created called ".env" inside of the server directory
 
the file should contain this:
-------------
PORT=9090
MONGO_URI=mongodb+srv://sds-artization:fptvmkZxjXhnDkqE@artizationcluster.bbubuyo.mongodb.net/?retryWrites=true&w=majority
SECRET=Zjy27U6SjpoqDNo0I96i
-------------

After doing these changes,
run "npm install" in root folder, client and server then "npm start" 
in both client and server simultaneously to start the server and the client.

=====================================
These are the three testing users:

Admin: admin@email.com
Curator: curator@email.com
Artist: artist@email.com

PASSWORD FOR ALL LOGINS: Password123!
=====================================