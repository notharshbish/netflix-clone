import pickle
import pandas as pd
import sys
import simplejson


movie_dict = pickle.load(open('./movie_dict.pkl' , 'rb'))
movies = pd.DataFrame(movie_dict)
similarity = pickle.load(open('./similarity.pkl','rb'))


# mycursor.execute("SELECT * FROM movies")

# for i in mycursor : 
#     print(i)
def recommend(movie) : 
    movie_index = movies[movies['title'] == movie].index[0]
    distances = similarity[movie_index]
    movies_list = sorted(list(enumerate(similarity[movie_index])) ,reverse = True , key = lambda x : x[1])[1:13]
    percent_array = []
    for i in movies_list : 
        percent_array.append(i[1])
    
    recommended_movies = []
    for i in movies_list : 
        match_percent = (i[1]/max(percent_array)) * 100
        recommended_movies.append({
        "titleId" : int(movies.iloc[i[0]].titleId) , 
        "title" : movies.iloc[i[0]].title,
        "genre" : movies.iloc[i[0]].genre , 
        "banner" : movies.iloc[i[0]].banner , 
        "poster" : movies.iloc[i[0]].poster , 
        "actors" : movies.iloc[i[0]].actors.split(",") , 
        "director" : movies.iloc[i[0]].director.split(",") , 
        "releaseDate" : int(movies.iloc[i[0]].releaseDate) , 
        "plot" : movies.iloc[i[0]].overview , 
        "rating" : movies.iloc[i[0]].rating , 
        "logo" : movies.iloc[i[0]].logo , 
        "thumbnail" : movies.iloc[i[0]].thumbnail  , 
        "trailer" : movies.iloc[i[0]].trailer , 
        "match_percent" : int(match_percent)
        })
    
    return simplejson.dumps(recommended_movies , ignore_nan = True)

print(recommend(sys.argv[1]))

