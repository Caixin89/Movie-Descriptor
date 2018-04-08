
# Movie Descriptor
Movie Desciptor gives short summaries of movies.

## Pre-requisites
Node.js (v6.10)
Register for an AWS Account
Register for an Amazon Developer Account

## Files
lambda/custom/Index.js: Back-end logic for Alexa Skill hosted on AWS Lambda
interactionModel.json: Interaction schema file

## Usage

Starting the skill:
```text
Alexa, start movie descriptor
    >>> Welcome to movie descriptor
```

Getting movie summary:
```text
Describe Titanic
    >>> A seventeen-year-old aristocrat falls in love with a kind but poor artist aboard the luxurious, ill-fated R.M.S. Titanic.
```

Help:
```text
Help me
    >>>I give short summaries of movies
```

Cancel:
```text
Cancel
    >>>Request cancelled
```

Stop:
```text
Stop
#Stops the current request
```

Quit/Exit:
```text
Quit/exit
#Exits the skill
```
