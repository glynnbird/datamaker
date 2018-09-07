# datagenerator

A command-line Node.js script and library that generates JSON or CSV data in bulk. If you are building an IT system, 
then the chances are you'll need to populate a database (whether SQL or NoSQL) with some reasonably realistic data
to test and benchmark with.

The *datagenerator* tool allows sample data to be created by supplying:

- a template of how the data is to look. The data can contain multiple placeholders where sample data will be inserted e.g. `{{firstname}},{{lastname}},{{date}}`.
- the format of the output data: `none`, `json` or `csv`. This effects how the generated string data is processed prior to delivery.
- the number of records to be created.

Quick example:

```sh
$ echo "{{uuid}},{{date}},{{firstname}} {{surname}},{{email}}" | datagenerator --format csv --iterations 5
10U9SHHE2463IH9E,1970-10-12,Marylee Dodge,meagan-harwell@betaine.com
379QYC80U5KYQP4D,1994-11-09,Melany Fuqua,jennette.labonte@yahoo.com
DERC4Y2BQ6HCI0HI,1983-08-11,Cathleen Leal,earlenemattson@gmail.com
00K8FEGZJO31Q08O,2005-06-18,Louie Lee,tonisha.short@hotmail.com
JDYSVPTAEXKEF9D8,1982-10-29,Dionne Vann,martin.renfro@hemicrane.com
```
## Pre-requisites

[Node.js & npm](https://nodejs.org/en/) are required to pre-installed. 

## Installation

To install the command-line utility, use `npm`:

```sh
$ npm install -g datagenerator
```

or add the library to an existing Node.js project:

```sh
$ npm install --save datagenerator
```

## Command-line parameters reference

- `--template`/`-t` - the path of the template file e.g `--template /path/to/template.txt`
- `--format`/`-f` - the target file format (`none`, `csv`, `json` or `xml`). Default `none` e.g. `--format json`
- `--iterations`/`-i` - the number of records to create. Default `1` e.g. `--iterations 5000`

## Generating CSV files

The template for a CSV file can be stored in a text file and supplied with the `--template/-t` parameter. Create a text file containing the following template:

```
{{uuid}},{{date}},{{time}},{{firstname}} {{surname}},{{street}},{{town}},{{zip}} {{statecode}},{{longitude}},{{latitude}}
```

The template contains the layout of each line of data, with placeholders for where the dynamic data is inserted. Save it as `template.txt`.

You may now run `datagenerator` using this template:

```sh
$ datagenerator -t ./template.txt -f csv -i 500
```

Alternatively, you can pipe in the template from elsewhere:

```sh
$ echo "{{uuid}},{{date}},{{firstname}} {{surname}},{{zip}}" | datagenerator --format csv --iterations 10000 
```

## Generating JSON data

JSON data is generated in a similar way. This time our template represents a single JSON document:

```js
{
  "_id": "{{uuid}}",
  "name": "{{firstname}} {{surname}}",
  "dob": "{{date}}",
  "address": {
    "street": "{{street}}",
    "town": "{{town}}",
    "postode": "{{postcode}}"
  },
  "telephone": "{{tel}}",
  "pets": ["{{cat}}","{{dog}}"],
  "score": {{float 1 10 1}},
  "email": "{{email}}",
  "url": "{{website}}",
  "description": "{{words 20}}",
  "verified": {{boolean 0.75}},
  "salary": {{float 10000 70000 0}}
}
```

Save the template as `template.json`.

Run the datagenerator as before but with `json` as the format parameter:

```sh
$ datagenerator -t ./template.json -f json -i 500 
{"_id":"G3BX8LUGFHAGFX7A","name":"Chelsea Ballou","dob":"2003-10-10","address":{"street":"0055 Houghton","town":"Tynemouth","postode":"HU0 4GF"},"telephone":"+509-9934-828-292","pets":["Murphy","Nala"],"score":9.5,"email":"nelson_jones@spousy.com","url":"http://propriospinal.com","description":"outmate solarometer Zapara tyro keratinize galactolytic divestiture swardy petaled tearlessness adjutorious epigynum jotation tavernly suggestum Eriophyes straint Tsuma malignation autoscience","verified":true,"salary":32082}
...
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

Run the datagenerator as before but with `xml` as the format parameter:


```sh
$ datagenerator -t ./template.xml -f xml -i 500 
<?xml version="1.0"?><company>  <name>Consulting </name>  <address>    <street>5270 Bispham Lane</street>    <city>Saint Louis</city>    <state>Alabama</state>    <zip>AZ83647</zip>  </address>  <ceo>Jefferey Harvey</ceo>  <dateCreated>2009-10-28</dateCreated></company>
...
```

## Using datagenerator to import data into Cloudant/CouchDB

Combining this tool with the [couchimport](https://www.npmjs.com/package/couchimport) utility allows data to be generated and imported into the a Cloudant/CouchDB database in one go:

```sh
$ datagenerator -t ./template.json -f json -i 100 | couchimport --database mydatabase --type jsonl
  couchimport Written ok:100 - failed: 0 -  (100) +1s
  couchimport { documents: 100, failed: 0, total: 100, totalfailed: 0 } +0ms
  couchimport writecomplete { total: 100, totalfailed: 0 } +96ms
  couchimport Import complete +0ms
```

They key thing here is to use `--type jsonl` which instructs `couchimport` to expect one JSON document per line.


## Tag reference

The Mustache-style tags you may use are listed below. Some tags allow extra parameters to be supplied to affect the range of random data generated

The code for the tags can be found in the `plugins` folder of the source code.

### {{airport}}

Three-digit airport code.          

Parameters: none

e.g.

```
{{airport}} ---> MTK
```

### {{autoinc}}

Auto-incrementing number.          

Parameters: none

e.g.

```
{{autoinc}} ---> 1 
{{autoinc}} ---> 2 
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

Parameters: none

e.g.

```
{{date}} ---> 1977-02-28
```

### {{date_iso}}

Random date in ISO-8601 format.

Parameters: none

e.g.

```
{{date_iso}} ---> 2013-05-24T02:44:04.687Z
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

Parameters: none

e.g.

```
{{email}} ---> jermaine.buchanan@drilling.com
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

### {{oneof}}

Picks one of supplied values.

Parameters: any number of strings

e.g.

```
{{oneof new provisional complete}} ---> provisional
{{oneof new provisional complete}} ---> new
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

Parameters: none

e.g.

```
{{timestamp}} ---> 351543517819
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
let dg = require('datagenerator')
const template = '{{title}} {{firstname}} {{surname}}'
const format = 'none'
const iterations = 500
dg.generate(template, format, iterations)
  .on('data', (d) => { console.log(d) })
  .on('end', (d) => { console.error('Done!') })
```

## Formatting

The `--formst`/`-f` parameter defines

- how the text in each substition is pre-processed before output e.g. in `json` mode double quotes are escaped correctly.
- how each line of output is processed prior to output e.g. in `json` mode the completed template is parsed to check it is valid JSON before being output on a a single line followed by a `\n` character

The code for the formatters can be found in the `formatters` folder of the source code.

## A note on the data

The data generated by this tool is biased towards UK and US data sets. The names, towns, streets and postcodes are gleaned from western data sets. If you need data that resembles a different geography or contains more challenging character sets, then the feel free to fork the code and modify the stock data from the `plugins` folder.

Note that generating an address with `{{street}},{{city}},{{state}},{{statecode}}{{zip}}` will generate what appears at a glance to be a reasonble address, but is patently nonsense:

```sh
$ echo "{{street}},{{city}},{{state}},{{statecode}}{{zip}}" | datagenerator
6682 Crowcroft Circle,Nashua,New York,UT00769
```

The plugins do not coordinate with each other to ensure that the street exists in the city, or that the city exists in the state, or that the state code matches the state. That would require a more sophisticated and much larger data set!

Also note that the email addresses, zip codes, domain names, telephone numbers, websites and postcodes are fabricated. Airports, towns, states, state codes, cities, counties, countries and currencies are real.