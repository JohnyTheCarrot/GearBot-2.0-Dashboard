# Infractions
GearBot can assist you keeping track of not only what happened but previous actions taken by the moderation team.

# Finding infractions
To find infractions there is one simple yet powerful command: ``inf search [fields...] [query] [amount]``
All parameters are optional, if you don't give any you get the last 100 infractions for the guild.
### Fields
Optional multi param, determines where to look.
Possible values the [] are part of the param, to avoid confusing them with the query:
- [mod]
- [user]
- [reason]

Multiple values can be passed. If omitted it defaults to ``[mod] [user] [reason]``.
Also see the **Examples** section below.

### Query
Optional param, can be any userID, mention, full username (only if the user is on the server) or plain text.
It will use this query to search the fields specified with the fields param. Also see **Examples** below

### Amount
The simplest param of them all, how many infractions you want to see. If the last thing in your command is a number between 1 and 500 (inclusive), this will be used as max amount of infractions to show. Defaults to 100.
If you instead want to do a reason search for something that is or ends with a number between 1 and 25, simply add another number as amount after it.

### Examples
The section where it all becomes clear!

Show the last 100 infractions from the server:
```
!inf search
```

Show the last 3 infractions from the server:
```
!inf search 3
```

Show the last 100 infractions related to a user (so either as mod, user, or where the ID is part of the reason):
```
!inf search 106354106196570112
```

Show the last 5 infractions handed out by a specific mod:
```
!inf search [mod] 106354106196570112 5
```

Show the last 500 infractions of a specific user, and any infractions where you used that user's ID in the reason:
```
!inf search [user] [reason] 106354106196570112 500
```

Show the last 10 bans for ban evasion:
```
!inf search ban evasion 10
```
