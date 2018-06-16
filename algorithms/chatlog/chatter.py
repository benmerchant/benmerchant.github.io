# chatlog.txt
# ben merchant
# 12:51 pm on a wed 04.04.17
## done w/o extra credit 1:45 pm on a on 04.04.17
## inclass lab time - 2:32 pm on a mon 04.04.17
    ## done w/ extra credit
## inclass lab time - 2:38 pm on a wed
    ## format output and submit by end of today

import csv
import re


def main():
    print('**************************************')
    print('Welcome to the Chatlog Anal-yzer 3500!')
    print('**************************************\n\n')
    # array for raw data
    oracle = []
    ## array for usernames
    userArr = []
    ## object for log counter
    userLogCount = {}
    ## AFAIK the names in the userArr should be in the same order as their key counterparts in the userlogCount obj
    ## need further testing

    

    ## regex setup arena
    timeRegExlogon = re.compile('[0-9]{1,2}:[0-9]{1,2}:[0-9]{1,2}\+')
    timeRegExlogoff = re.compile('[0-9]{1,2}:[0-9]{1,2}:[0-9]{1,2}\-')
    ipAddyRegEx = re.compile('(?:\d{1,3}\.){3}\d{1,3}')


    
    with open ('chatlog.txt', newline='') as chatlog:
        for row in csv.reader(chatlog):
            oracle.append(row)

    linecounter = 0
    for ii in range(len(oracle)):
        # re.match(pattern, string, flags=0)
        currentLine = str(oracle[ii])
        ## work with currentLine
        lineSplit = currentLine.split()
        ## match objects for regex function 
        matchLogon = timeRegExlogon.search(currentLine)
        matchLogoff = timeRegExlogoff.search(currentLine)


        ## quick hack - clean up later

    
        if matchLogon or matchLogoff:
            currentUserName=lineSplit[1]

            if currentUserName not in userArr:
                ## add username to user Array
                userArr.append(currentUserName)
                ## add username as a key to user dict with a value of 0
                ## time on and off are MOST RECENT LOGON or LOGOFF
                userLogCount[str(currentUserName)] = {
                        'ON': 0,
                        'time-on': 00,
                        'OFF': 0,
                        'time-off': 00,
                        'total-time':00,
                        'on-count':0,
                        'off-count':0
                    }
                ## for the purposes of this app, the 00 in time-on will stand for midnight
                ## since in this case we only have data for day
                
                
                
            
            

            ## really messy but it works
                ## new code below
####################            currentIPaddy = lineSplit[len(lineSplit)-1].split(')')
####################            currentIPaddy = currentIPaddy[0].split('.')
####################
####################            
####################
####################            currentIPaddyArr = []
####################                
####################            if len(currentIPaddy)==4:
####################                for jj in range(4):
####################                    if jj == 0:
####################                        currentIPaddy[jj] = currentIPaddy[jj].split('@')[1]    
####################                    currentIPaddyArr.append(currentIPaddy[jj])
####################            elif len(currentIPaddy)==5:
####################                for jj in range(1,5):
####################                    currentIPaddyArr.append(currentIPaddy[jj])
####################            currentIPaddy = '.'.join(currentIPaddyArr)


            ## Cleaner method
            IPmatchobj = ipAddyRegEx.search(currentLine)
            IPaddress = IPmatchobj.group(0)
            
            
            ## add it to user obj
            userLogCount[str(currentUserName)]['IP']=IPaddress
            

            
            ## get current log time

            ## not going to do this with regex
            ## would have to redo the if/else structure
            
            currentLogTimeStamp = str(lineSplit[0])[2:10]
            currentLogTimeStamp = currentLogTimeStamp.split(':')
            currentLogTimeStamp = int(currentLogTimeStamp[0])*60*60 + int(currentLogTimeStamp[1])*60 + int(currentLogTimeStamp[2])

            


           ## print(currentLogTimeStamp)

        
            if matchLogon:
                # string formatting
                print('LOGON:\t{} IP: {}'.format(currentUserName,IPaddress))
                userLogCount[currentUserName]['ON'] = userLogCount[currentUserName]['ON'] + 1
                userLogCount[currentUserName]['time-on'] = currentLogTimeStamp
                
            elif matchLogoff:
                print('LOGOFF:\t{} IP: {}'.format(currentUserName,IPaddress))
                userLogCount[currentUserName]['OFF'] = userLogCount[currentUserName]['OFF'] + 1
                userLogCount[currentUserName]['time-off'] = currentLogTimeStamp
                ## add to 'total-time'
                ## HH / 3600 + MM / 60 + SS
                tempTime = userLogCount[str(currentUserName)]['time-off']-userLogCount[currentUserName]['time-on']
                tempTime = int(tempTime) ## total amount of seconds
                
                userLogCount[currentUserName]['total-time'] =  userLogCount[currentUserName]['total-time'] + tempTime

            
            
            
        ## end main if statement    
        linecounter = linecounter + 1
    ## end main for statement
        
    print('\n***********************************')
    print('USER LOG ON LOG OFF COUNTER DISPLAY')
    print('***********************************\n')

    ## display for each user; username, total-time spend online
    
    for kk in range(len(userArr)):
        print('User: {}'.format(userArr[kk]))
        print('IP: {}'.format(userLogCount[userArr[kk]]['IP']))
        tempTime2 = userLogCount[userArr[kk]]['total-time']
        tempTimeHH = int(tempTime2 / 60 / 60)
        tempTimeMM = int(tempTime2 / 60) - tempTimeHH*60
        tempTimeSS = int(tempTime2) - tempTimeHH*60*60 - tempTimeMM*60
        totalTimeStr = str(tempTimeHH)+':'+str(tempTimeMM)+':'+str(tempTimeSS)
        print('Total Time Online: {}'.format(totalTimeStr)+'\n')
        
    
    input()





main()
