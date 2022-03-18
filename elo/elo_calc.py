class Elo:
    def __init__(self, k, g=1):
        self.ratingDict = {}
        self.k = k
        self.g = g

    def addPlayer(self, name, rating=1500):
        self.ratingDict[name] = rating

    def gameOver(self, winner, loser):
        result = self.expectResult(
            self.ratingDict[winner], self.ratingDict[loser])
        self.ratingDict[winner] = self.ratingDict[winner] + \
            (self.k*self.g)*(1 - result)
        self.ratingDict[loser] = self.ratingDict[loser] + \
            (self.k*self.g)*(0 - (1 - result))

    def expectResult(self, p1, p2):
        exp = (p2-p1)/400.0
        return 1/((10.0**(exp))+1)

    def getRating(self, name):
        return self.ratingDict[name]

def average_rating_change(old_rating, new_rating, n):
    diff = new_rating - old_rating
    old_rating += diff
    return old_rating

def update_ratings(arr):
    # (pk, score, rating) => arr

    # second element is the score
    arr = sorted(arr, key=lambda x: x[1], reverse=True)

    # (pk, rank+1, rating)
    ranked_arr = [(obj[0], rank+1, obj[2]) for rank, obj in enumerate(arr)]

    eloLeague = Elo(k=20)

    for user in ranked_arr:
        eloLeague.addPlayer(user[0], user[2])

    for i in range(len(ranked_arr)):
        for j in range(i+1, len(ranked_arr)):
            eloLeague.gameOver(winner=ranked_arr[i][0], loser=ranked_arr[j][0])

    result_arr = []

    for pk, _, old_rating in ranked_arr:
        result_arr.append((pk, average_rating_change(old_rating, eloLeague.getRating(pk), len(ranked_arr) - 1)))

    return result_arr
