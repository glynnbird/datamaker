# datamaker

A command-line Node.js script and library that generates JSON or CSV data in bulk. If you are building an IT system, 
then the chances are you'll need to populate a database (whether SQL or NoSQL) with some reasonably realistic data
to test and benchmark with.

The *datamaker* tool allows sample data to be created by supplying:

- a template of how the data is to look. The data can contain multiple placeholders where sample data will be inserted e.g. `{{firstname}},{{lastname}},{{date}}`.
- the format of the output data: `none`, `json` or `csv`. This effects how the generated string data is processed prior to delivery.
- the number of records to be created.

Quick example:

```sh
$ echo "{{uuid}},{{date}},{{firstname}} {{surname}},{{email}}" | datamaker --format csv --iterations 5
10U9SHHE2463IH9E,1970-10-12,Marylee Dodge,meagan-harwell@betaine.com
379QYC80U5KYQP4D,1994-11-09,Melany Fuqua,jennette.labonte@yahoo.com
DERC4Y2BQ6HCI0HI,1983-08-11,Cathleen Leal,earlenemattson@gmail.com
00K8FEGZJO31Q08O,2005-06-18,Louie Lee,tonisha.short@hotmail.com
JDYSVPTAEXKEF9D8,1982-10-29,Dionne Vann,martin.renfro@hemicrane.com
```

You can see the *datamaker* library in action at https://glynnbird.github.io/datamakerui/

## Pre-requisites

[Node.js & npm](https://nodejs.org/en/) are required to be pre-installed. 

## Installation

To install the command-line utility, use `npm`:

```sh
$ npm install -g datamaker
```

or add the library to an existing Node.js project:

```sh
$ npm install --save datamaker
```

## Command-line parameters reference

- `--template`/`-t` - the path of the template file e.g `--template /path/to/template.txt`
- `--format`/`-f` - the target file format (`none`, `csv`, `json` or `xml`). Default `none` e.g. `--format json`
- `--iterations`/`-i` - the number of records to create. Default `1` e.g. `--iterations 5000`
- `--list`/`-l` - list the available tags 

## Generating CSV files

The template for a CSV file can be stored in a text file and supplied with the `--template/-t` parameter. Create a text file containing the following template:

```
{{uuid}},{{date}},{{time}},{{firstname}} {{surname}},{{street}},{{town}},{{zip}} {{statecode}},{{longitude}},{{latitude}}
```

The template contains the layout of each line of data, with placeholders for where the dynamic data is inserted. Save it as `template.txt`.

You may now run `datamaker` using this template:

```sh
$ datamaker -t ./template.txt -f csv -i 500
```

Alternatively, you can pipe in the template from elsewhere:

```sh
$ echo "{{uuid}},{{date}},{{firstname}} {{surname}},{{zip}}" | datamaker --format csv --iterations 10000 
```

## Generating JSON data

JSON data is generated in a similar way. This time our template represents a single JSON document:

```js
{
  "_id": "{{uuid}}",
  "name": "{{firstname}} {{surname}}",
  "dob": "{{date 2014-01-01}}",
  "address": {
    "street": "{{street}}",
    "town": "{{town}}",
    "postode": "{{postcode}}"
  },
  "telephone": "{{tel}}",
  "pets": ["{{cat}}","{{dog}}"],
  "((loop children 4))":"{{firstname}}"
  "score": {{float 1 10 1}},
  "email": "{{email}}",
  "url": "{{website}}",
  "description": "{{words 20}}",
  "verified": {{boolean 0.75}},
  "salary": {{float 10000 70000 0}},
}
```

Save the template as `template.json`.

Run the `datamaker` as before but with `json` as the format parameter:

```sh
$ datamaker -t ./template.json -f json -i 500 
{"_id":"G3BX8LUGFHAGFX7A","name":"Chelsea Ballou","dob":"2003-10-10","address":{"street":"0055 Houghton","town":"Tynemouth","postode":"HU0 4GF"},"telephone":"+509-9934-828-292","pets":["Murphy","Nala"],"children":["John","Anne", "Tracy","Amelie"],"score":9.5,"email":"nelson_jones@spousy.com","url":"http://propriospinal.com","description":"outmate solarometer Zapara tyro keratinize galactolytic divestiture swardy petaled tearlessness adjutorious epigynum jotation tavernly suggestum Eriophyes straint Tsuma malignation autoscience","verified":true,"salary":32082}
...
```

### Loops

Only in JSON-Templates you may use the loop-command to create an Array of data.

Usage:  
```json
"((loop property number[,max]))":{}
```

- property will be the name of the array
- number is the number of times to repeat the object into the resulting array. if used with a second number, a random number between these two will be used, eg. `"((loop tags 2,9))": "{{word}}"`

Example:  
```json
{
  "((loop items 2))": {
    "name":"{{word}}",
    "price":"{{price}}"
  }
}
```

results in

```json

{
  "items": [
    {
      "name":"some",
      "price":"2.50"
    },
    {
      "name":"item",
      "price":"4.30"
    }
  ]
}
```

## Generating XML data

Create an XML template e.g. `template.xml`:

```
<?xml version="1.0"?>
<company>
  <name>{{company}}</name>
  <address>
    <street>{{street}}</street>
    <city>{{city}}</city>
    <state>{{state}}</state>
    <zip>{{statecode}}{{zip}}</zip>
  </address>
  <ceo>{{firstname}} {{surname}}</ceo>
  <dateCreated>{{date}}</dateCreated>
</company>
```

Run the datamaker as before but with `xml` as the format parameter:


```sh
$ datamaker -t ./template.xml -f xml -i 500 
<?xml version="1.0"?><company>  <name>Consulting </name>  <address>    <street>5270 Bispham Lane</street>    <city>Saint Louis</city>    <state>Alabama</state>    <zip>AZ83647</zip>  </address>  <ceo>Jefferey Harvey</ceo>  <dateCreated>2009-10-28</dateCreated></company>
...
```

## Using datamaker to import data into Cloudant/CouchDB

Combining this tool with the [couchimport](https://www.npmjs.com/package/couchimport) utility allows data to be generated and imported into the a Cloudant/CouchDB database in one go:

```sh
$ datamaker -t ./template.json -f json -i 100 | couchimport --database mydatabase --type jsonl
  couchimport Written ok:100 - failed: 0 -  (100) +1s
  couchimport { documents: 100, failed: 0, total: 100, totalfailed: 0 } +0ms
  couchimport writecomplete { total: 100, totalfailed: 0 } +96ms
  couchimport Import complete +0ms
```

They key thing here is to use `--type jsonl` which instructs `couchimport` to expect one JSON document per line. The *couchimport* utility bundles the JSON into bulk API calls and posts them to the database via HTTP.

## Filters

A datamaker tag can also include optional filters by supplying strings after a `|` character e.g.

```
$ echo '{{ name | toUpperCase }}' | datamaker
JANYCE MOE
```

Filters can be chained e.g.

```
$ echo '{{ words 5 | toUpperCase | toArray}}' | datamaker
["BUDAPEST","LICENSING","GMC","METHODOLOGY","MEM"]
$ echo '{{ name | toLowerCase | sha256 }}' | datamaker
76576efc53b4441d342acbca485457f948c1b97c4a2515a05ffc47aa524b5093
```

### Available filters

- `toUpperCase`
- `toLowerCase`
- `toArray`
- `md5`
- `sha1`
- `sha256`
- `base64`
- `toString`

## Tag reference

The Mustache-style tags you may use are listed below. Some tags allow extra parameters to be supplied to affect the range of random data generated

The code for the tags can be found in the `plugins` folder of the source code.

- A-E - [addressuk](#addressuk) [addressus](#addressus) [addressgerman](#addressgerman) [airport](#airport) [autoinc](#autoinc) [boolean](#boolean) [cat](#cat) [city](#city) [cityGerman](#cityGerman) [company](#company) [country](#country) [creditcard](#creditcard) [currency](#currency) [date](#date) [date_iso](#date_iso) [digits](#digits) [dog](#dog) [domainname](#domainname) [email](#email) [emojii](#emojii)
- F-O - [file](#file) [firstname](#firstname) [float](#float) [integer](#integer) [ip](#ip) [ip6](#ip6) [kuuid](#kuuid) [kuuidr](#kuuidr) [last](#last) [latitude](#latitude) [letters](#letters) [longitude](#longitude) [mac](#mac) [marque](#marque) [monarch](#monarch) [name](#name) [normal](#normal) [oneof](#oneof)
- P-T - [password](#password) [president](#president) [postcode](#postcode) [price](#state) [prime](#prime) [product](#product) [sic](#sic) [state](#statecode) [statecode](#statecode) [street](#street) [streetGerman](#streetGerman) [surname](#surname) [tel](#tel) [time](#time) [timestamp](#timestamp) [title](#title) [tld](#tld) [town](#town)
- U-Z - [unit](#unit) [url](#url) [uuid](#uuid) [uuidv4](#uuidv4) [website](#website) [word](#) [words](#words) [youtube](#youtube) [zip](#zip)

### {{addressuk}}

Single-line UK address.         

Parameters: none

e.g.

```
{{addressuk}} ---> 9315 Lancaster Circle, Haslingden, Nottinghamshire, HS15 6YD
```

### {{addressus}}

Single-line US address.         

Parameters: none

e.g.

```
{{addressus}} ---> 8184 Ambrose, Fontana, Minnesota, 44626
```

### {{addressgerman}}

Single-line German address.         

Parameters: none

e.g.

```
{{addressgerman}} ---> Bahnhofsstrasse 12, 80335 München
```

### {{airport}}

Three-digit airport code.          

Parameters: none

e.g.

```
{{airport}} ---> MTK
```

### {{autoinc}}

Auto-incrementing number.          

Parameters: 

- starting number (default 1)

e.g.

```
{{autoinc 1000}} ---> 1000
{{autoinc}} ---> 1001
```

### {{boolean}}

Boolean value.

Parameters: 

- probability of being true (default 0.5)

e.g.

```
{{boolean}} ---> false
{{boolean 0.95}} ---> true
```

### {{cat}}

Cat name.

Parameters: none

e.g.

```
{{cat}} ---> Smokey
```

### {{city}}

US city name.

Parameters: none

e.g.

```
{{city}} ---> Fremont
```

### {{cityGerman}}

German city name.

Parameters: none

e.g.

```
{{cityGerman}} ---> Berlin
```

### {{company}}

Company name.

Parameters: none

e.g.

```
{{company}} ---> Venusian Software Corp
```

### {{country}}

Country name.

Parameters: none

e.g.

```
{{country}} ---> Lebanon
```

### {{county}}

UK county name.

Parameters: none

e.g.

```
{{county}} ---> Derbyshire
```

### {{creditcard}}

Credit card number.

Parameters: none

e.g.

```
{{creditcard}} ---> 6011867289904845
```

### {{currency}}

Currency code.

Parameters: none

e.g.

```
{{currency}} ---> USD
```

### {{date}}

Random date in YYYY-MM-DD format.

Parameters: 

- min - minimum date (default '1970-01-01')
- max - maximum date (default 'now')

e.g.

```
{{date}} ---> 1977-02-28
{{date 2015-01-01}} ---> 2018-08-02 // date after 2015-01-01
{{date 2015-01-01 2016-01-01}} ---> 2015-04-23 // date in 2015
```

### {{date_iso}}

Random date in ISO-8601 format.

Parameters: 

- min - minimum date (default '1970-01-01')
- max - maximum date (default 'now')

e.g.

```
{{date_iso}} ---> 2013-05-24T02:44:04.687Z
{{date_iso 2015-01-01}} ---> 2018-07-09T22:15:30.512Z // date after 2015-01-01
{{date_iso 2015-01-01 2016-01-01}} ---> 2015-04-21T18:08:33.979Z // date in 2015
```

### {{digits}}

String of numerals.

Parameters: 

- numDigits (default 5)

e.g.

```
{{digits}} ---> 06984
{{digits 8}} ---> 61103920
```

### {{dog}}

Dog name.

Parameters: none

e.g.

```
{{dog}} ---> Lucky
```

### {{domainname}}

Domain name.

Parameters: none

e.g.

```
{{domainname}} ---> yallaer.com
```

### {{email}}

Email address.

Parameters: 

- whether to use the previous firstname/surname for the email generation

e.g.

```
{{email}} ---> jermaine.buchanan@drilling.com

# based on previous name
{{name}} ---> Sheba Arthur
{{email true}} ---> sheba21436@yes.etnedal.no
```

### {{emojii}}

Emojii.

Parameters: 

- numChars - number of characters (default 1)

e.g.

```
{{emojii}} ---> 👦
{{emojii 3}} ---> 🌹⛔💺
```

### {{file}}

Get a random line from a simple text-file, e.g.

```
line1
another line
yeah
```

Parameters:

- filename - full path to the file (no default)

e.g.

```
{{file /path/to/file.txt}} ---> line1
```

### {{firstname}}

Human first name.

Parameters: 

e.g.

```
{{firstname}} ---> Bethan
```

### {{float}}

Floating point number.

Parameters: 

- min (default 1)
- max (default 100)
- decimalPlaces (default 4)

e.g.

```
{{float}} ---> 13.8592
{{float 1000 2000 2}} ---> 1750.06
```

### {{integer}}

Integer number.

Parameters: 

- min (default 1)
- max (default 100)

e.g.

```
{{integer}} ---> 99
{{integer 1000 2000}} ---> 1523
```

### {{ip}}

IP4 address.

Parameters: 

- local - boolean (whether to generate an IP in the 192.168.1 range or not)

e.g.

```
{{ip}} ---> 63.235.50.110
{{ip true}} ---> 192.168.1.58
```

### {{ip6}}

IP6 address.

Parameters: 

- local - boolean (whether to generate an IP in the fc00::: range or not)

e.g.

```
{{ip6}} ---> 487d:375d:7bfe:b23b:d1e2:8934:cfb2:c17e
{{ip true}} ---> fc00:cefe:5dfc:14da:691d:b4bf:63ac:6d17
```

### {{kuuid}}

Time-sortable, unique identifier. see [here](https://www.npmjs.com/package/kuuid)

Parameters: 

- min (optional) - minimum date
- max (optional) - maximum date

e.g.

```
{{kuuid}} ---> 001g8LWk0Svk222Bd0Et0GeaBl1P1gkP
{{kuuid 2010-01-01 2019-01-01}} ---> 001eWhUE2HLix22HqmL5436NDm1p02X6
```

### {{kuuidr}}

Time-sortable, unique identifier, but in reverse order. see [here](https://www.npmjs.com/package/kuuid)

Parameters: 

- min (optional) - minimum date
- max (optional) - maximum date

e.g.

```
{{kuuidr}} ---> zzzwSGtT2o36oK17mC4R26dkHI1f1Xm0
{{kuuid 2010-01-01 2019-01-01}} ---> zzyTAKwG1uzH1N4Cl4xi1vZIE22oxrrT
```

### {{last}}

The last generate value of the supplied tag. This is used to re-use generated data elsewhere in your template.

Parameters:

- tag - the name of the tag

e.g.

```
{{last uuid}} ---> HSFC5LQPCP84IVY7 (the last uuid that was generated by datamaker)
```

### {{latitude}}

Decimal latitude.

Parameters: none

e.g.

```
{{latitude}} ---> -54.4371
```

### {{letters}}

String of uppercase characters.

Parameters: 

- numLetters (default 5)

e.g.

```
{{letters}} ---> TVEHJ
{{letters 10}} ---> WOBOJRJFCU
```

### {{longitude}}

Decimal longitude.

Parameters: none

e.g.

```
{{longitude}} ---> 175.2526
```

### {{mac}}

Mac address

Parameters: none

e.g.

```
{{mac}} ---> 23-0d-a3-3e-cf-d8
```

### {{marque}}

Car manufacturer.

Parameters: none

e.g.

```
{{marque}} ---> Bugatti
```

### {{monarch}}

King or Queen.

Parameters: none

e.g.

```
{{monarch}} ---> Henry VIII
```

### {{oneof}}

Picks one of supplied values.

Parameters: any number of strings

e.g.

```
{{oneof Gryffindor Hufflepuff Ravenclaw Slytherin}} ---> Slytherin
```

### {{name}}

Combination for firstname and surname. Equivalent of `{{firstname}} {{surname}}`.

Parameters: none

e.g.

```
{{name}} ---> Anna Flint
```

### {{normal}}

Generates numbers on a normal distribution

Parameters: 

- mean - centre of distribution (default 50)
- stddev - standard deviation (default 1)
- decimalPlaces - number of decimal places (default 4)

e.g.

```
{{normal}} ---> 50.1097
{{normal 20000 1000 2}} ---> 20370.88
```

### {{password}}

A commonly-used password.

Parameters: none

e.g.

```
{{password}} ---> abcd1234
{{password | md5}} ---> 1f3870be274f6c49b3e31a0c6728957f
```

### {{president}}

A US president

Parameters: None

e.g.

```
{{president}} ---> Richard Nixon
```

### {{postcode}}

UK postcode.

Parameters: none

e.g.

```
{{postcode}} ---> KT4 0XS
```

### {{price}}

Floating point price.

Parameters: 

- min (default 1)
- max (default 100)

e.g.

```
{{price}} ---> 65.29
{{price 500 700}} ---> 521.98
```

### {{prime}}

Prime number. If you supply impossible parameters, you will get _1_ in reply.

Parameters: 

- min (default 1)
- max (default 100)

e.g.

```
{{prime}} ---> 17
{{prime 1000 3000}} ---> 1657
```

### {{product}}

Product name. 

Parameters: 

- None

e.g.

```
{{product}} ---> CARABAO
{{product | toTitleCase}} ---> Salt
```

### {{sic}}

Industry standard SIC code - business category

Parameters: none

e.g.

```
{{sic}} ---> Growing of tobacco
```

### {{state}}

US state name.

Parameters: none

e.g.

```
{{state}} ---> Ohio
```

### {{statecode}}

2-letter US state code.

Parameters: none

e.g.

```
{{statecode}} ---> NC
```

### {{street}}

Street address.

Parameters: none

e.g.

```
{{street}} ---> 6502 Chantler Avenue
```

### {{streetGerman}}

German Street name.

Parameters: none

e.g.

```
{{streetGerman}} ---> Schulstrasse
```

### {{surname}}

Human surname.

Parameters: none

e.g.

```
{{surname}} ---> Doyle-Tyson
```

### {{tel}}

International telephone number.

Parameters: none

e.g.

```
{{tel}} ---> +43-3040-100-474
```

### {{time}}

Time in HH:MM:SS format.

Parameters: none

e.g.

```
{{time}} ---> 10:45:59
```

### {{timestamp}}

Timestamp in milliseconds since 1970.

Parameters: 

- min - minimum timestamp (default 0)
- max - maximum timestamp (default 'now')

e.g.

```
{{timestamp}} ---> 351543517819
{{timestamp 946684800000}} --> 1163308913102  // timestamp after 2000-01-01
{{timestamp 946684800000 978307200000}} --> 959753617250  // timestamp in year 2000
```

### {{title}}

Honorific or title e.g. Mr, Mrs etc.

Parameters: none

e.g.

```
{{title}} ---> Reverend
```

### {{tld}}

Top level domain, or common domain name ending.

Parameters: none

e.g.

```
{{tld}} ---> gov.pr
```

### {{town}}

UK town name.

Parameters: none

e.g.

```
{{town}} ---> Dudley
```

### {{unit}}

An SI Unit

Parameters: none

e.g.

```
{{unit}} ---> °C
```

### {{url}}

Full URL.

Parameters: none

e.g.

```
{{url}} ---> https://www.jovinianist.com/microcosmology.html?adrenalone=VEF0TSB23N04V8MO
```

### {{uuid}}

Unique identifier.

Parameters: none

e.g.

```
{{uuid}} ---> C3QTU8YIVKZY126Q
```

### {{uuidv4}}

Unique identifier v4.

Parameters: none

e.g.

```
{{uuidv4}} ---> d1e606b0-0452-46a7-9190-8671a82fdea0
```

### {{website}}

Full website URL.

Parameters: none

e.g.

```
{{website}} ---> http://unlyrically.com
```

### {{word}}

Single word.

Parameters: none

e.g.

```
{{word}} ---> synentognathous
```

### {{words}}

Multiple words.

Parameters: 

- count (default 5)

e.g.

```
{{words}} ---> piacularly burp archisymbolical glumaceous Calinago
{{words 2}} --->Xenomorpha mauler
```

### {{youtube}}

Random YouTube URL.

Parameters: none

e.g.

```
{{youtube}} ---> https://www.youtube.com/watch?v=dQw4w9WgXcQ
```

### {{zip}}

US ZIP code.

Parameters: none

e.g.

```
{{zip}} ---> 69882
```

## Using as a library

You can use this npm module as a library in your own code

```js
let dg = require('datamaker')
const template = '{{title}} {{firstname}} {{surname}}'
const format = 'none'
const iterations = 500
dg.generate(template, format, iterations)
  .on('data', (d) => { console.log(d) })
  .on('end', (d) => { console.error('Done!') })
```

### Custom Plugins

When using datamaker as a library it is possible to extend its capability by defining custom plugins to suit the individual needs of a project. A custom plugin should be located inside the `/datamaker/plugins/` folder at the root of the applications project with each plugin created as a separate js file within a `namespace` folder allowing plugins to referenced in templates as `{{namespace:plugin}}`. For example:

```
datamaker
└── plugins
    └── myorg
        └── employeeid.js
```

With the custom `employeeid` plugin defined as follows:

```js
module.exports = () => {
  const min = 1000000
  const max = 3000000
  return (Math.floor(min + Math.random() * (max - min))).toString()
}
```

The custom plugin can then be referenced in a template using `{{myorg:employeeid}}` as follows:

```js
let dg = require('datamaker')
const template = '{{myorg:employeeid}} {{title}} {{firstname}} {{surname}}'
const format = 'none'
const iterations = 5
dg.generate(template, format, iterations)
  .on('data', (d) => { console.log(d) })
  .on('end', (d) => { console.error('Done!') })
```

Resulting in the following:

```
2286807 Mr Athena Bowles
1727729 Prof Heidi Barrow
2411511 Mr Lawanna Karr
2898717 Mrs Londa Wingate
1756263 Ms Lashay Pitre
```

## Formatting

The `--formst`/`-f` parameter defines

- how the text in each substition is pre-processed before output e.g. in `json` mode double quotes are escaped correctly.
- how each line of output is processed prior to output e.g. in `json` mode the completed template is parsed to check it is valid JSON before being output on a a single line followed by a `\n` character

The code for the formatters can be found in the `formatters` folder of the source code.

## A note on the data

The data generated by this tool is biased towards UK and US data sets. The names, towns, streets and postcodes are gleaned from western data sets. If you need data that resembles a different geography or contains more challenging character sets, then the feel free to fork the code and modify the stock data from the `plugins` folder or follow the guidance above and add your own specific [custom plugins](#custom-plugins).

Note that generating an address with `{{street}},{{city}},{{state}},{{statecode}}{{zip}}` will generate that appears at a glance to be a reasonble address, but is patently nonsense:

```sh
$ echo "{{street}},{{city}},{{state}},{{statecode}}{{zip}}" | datamaker
6682 Crowcroft Circle,Nashua,New York,UT00769
```

The plugins do not coordinate with each other to ensure that the street exists in the city, or that the city exists in the state, or that the state code matches the state. That would require a more sophisticated and much larger data set!

Also note that the email addresses, zip codes, domain names, telephone numbers, websites and postcodes are fabricated. Airports, towns, states, state codes, cities, counties, countries and currencies are real.
