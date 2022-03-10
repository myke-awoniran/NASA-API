# NASA-API
work with nasa csv files to get habitable planets and then save numbers of launches from space X data to populate my database.


# to get all planets.
submit a **POST** request to /v1/planets

# to get all launches

submit a **GET** request to /v1/launches
 	for **PAGINATION** , pass  query parameter **page, limit** into the  **URI. **
		 e.g /v1/launches?pages=2&limit=100
 
 


