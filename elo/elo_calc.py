from core.models import Contest, User

# 0. Sort array with score and generate ranking [Done]
# 1. populate array with user_rating [Done]
# 2. run elo with o(n^2)

class Elo:

	def __init__(self,k,g=1,homefield = 100):
		self.ratingDict  	= {}	
		self.k 				= k
		self.g 				= g
		self.homefield		= homefield

	def addPlayer(self,name,rating = 1500):
		self.ratingDict[name] = rating
		
	def gameOver(self, winner, loser, winnerHome):
		if winnerHome:
			result = self.expectResult(self.ratingDict[winner] + self.homefield, self.ratingDict[loser])
		else:
			result = self.expectResult(self.ratingDict[winner], self.ratingDict[loser]+self.homefield)

		self.ratingDict[winner] = self.ratingDict[winner] + (self.k*self.g)*(1 - result)  
		self.ratingDict[loser] 	= self.ratingDict[loser] + (self.k*self.g)*(0 - (1 -result))
		
	def expectResult(self, p1, p2):
		exp = (p2-p1)/400.0
		return 1/((10.0**(exp))+1)
	
	def getRating(self, name):
		return self.ratingDict[name] 
		
	


def update_ratings(arr):
    # (pk, score, rating) => arr

    # second element is the score
    sorted(arr, key=lambda x: x[1], reverse=True)
    # (pk, rank+1, rating)
    ranked_arr = [ (pk, rank + 1, rating) for rank, pk, _, rating  in enumerate(arr) ]

    eloLeague = Elo(k = 20)

    for user in ranked_arr:
        eloLeague.addPlayer(user[0], user[2])

    for i in range(len(ranked_arr)):
        for j in range(i+1, len(ranked_arr)):
            eloLeague.gameOver(winner=ranked_arr[i][0], loser=ranked_arr[j][0])

    result_arr = []

    for pk, _, _ in ranked_arr:
        result_arr.append((pk, eloLeague.getRating(pk)/(len(ranked_arr)-1)))

    return result_arr