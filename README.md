# Battles_node_mongo

This project connects to  mondo Db and node express for backend.

starting commands
run npm i --install all node modules

node index.js ---to start the application


API 

localhost:8080/api/battles/list
returns list(array) of all the places where the battle has taken place. E.g. ['Riverrun', 'Tyrell',....] 

localhost:8080/api/battles/count   returns the total number of battles occurred.   

localhost:8080/api/battles/search    
localhost:8080/api/battles/search?king=Robb Stark   
- return list of battles where 'attacker_king' or 'defender_king' was 'Robb Stark' Should also work for multiple queries   

localhost:8080/api/battles/search?king=Robb Stark&location=Riverrun&type=siege        
