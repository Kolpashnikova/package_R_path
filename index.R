library(path)
library(rjson)
library(jsonlite)

s <- fromJSON('ex_data.txt')
w <- fromJSON('weights.txt')

act <- fromJSON('{
  "Sleep": 1, "Personal Care": 2,
  "Housework": 3, "Child Care": 4, "Adult Care": 5, "Work": 6,
  "Shopping": 7, "TV Watching": 8, "Eating": 9, "Leisure": 10, "Travel": 11
  }')


path(df = toJSON(s), act = act, w=w, layout = "circularCenter", focusActivity = "Sleep",
     colors = c("#FF5733", "#33FF57", "#337AFF", "#FF33D4", "#FFFF33", "#4A90E2",
                "#FFA500", "#8A2BE2", "#008000", "#800000", "#A52A2A"))
