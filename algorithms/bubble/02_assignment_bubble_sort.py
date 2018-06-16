# Ben Merchant
# Assignment 2 - Sorting I - Bubble Sort

from random import randint

# 1. Create a list containing X random numbers(1-100), where X is userInput
# 3. Give the user an option to sort ascending or descending and sort accordingly

userInput = input("How many numbers to generate and sort?: ")
userDirec = input("[A]scending or [D]escending?: ")

ii = 0;
listGen = []



while ii < int(userInput):
    rando = randint(0,100)
    listGen.append(rando) 
    ii = ii+1

# 2. Display the unsorted list
print("Unsorted List:\t", listGen)

# BUBBLE SORT THE LIST

# 4. Keep track of the number of comparisons and the number of swaps done during the sort
comps = 0
swaps = 0

ending = len(listGen)

for nn in range(0,ending-1):
    xx = 0
    
    for element in range(0,ending-1):
        comps = comps+1
        if(listGen[element]>listGen[element+1]):
            swaps = swaps+1
            listGen[element], listGen[element+1] = listGen[element+1], listGen[element]
            xx = 1 

    if(xx==0):
        break
        



# 5. Display the sorted list
print("Sorted List:\t", listGen)


# 6. Display the number of swaps and comparisons
print("Comparisons:\t", comps)
print("Swaps:\t\t",swaps)
