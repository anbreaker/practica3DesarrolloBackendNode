---
title: Nodepopº v1.0
language_tabs:
  - javascript: javascript
language_clients:
  - javascript: ""
toc_footers: []
includes: []
search: false
highlight_theme: darkula
headingLevel: 2

---

<!-- Generator: Widdershins v4.0.1 -->

<h1 id="nodepop-">Nodepopº v1.0</h1>

> Scroll down for code samples, example requests and responses. Select a language for code samples from the tabs above or the mobile navigation menu.

Base URLs:

* <a href="http://localhost:3000">http://localhost:3000</a>

<h1 id="nodepop--default">Default</h1>

## Your GET endpoint

<a id="opIdget-api-ads-id"></a>

> Code samples

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('http://localhost:3000/api/ads/{id}',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`GET /api/ads/{id}`

Get an ad by with identifier (_id)

<h3 id="your-get-endpoint-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|string|true|none|

> Example responses

> 200 Response

```json
{
  "name": "string",
  "onSale": true,
  "cost": 0,
  "imagePath": "string",
  "tags": [
    "string"
  ],
  "_id": "string"
}
```

<h3 id="your-get-endpoint-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|[ad](#schemaad)|

<aside class="success">
This operation does not require authentication
</aside>

## post-api-ads

<a id="opIdpost-api-ads"></a>

> Code samples

```javascript
const inputBody = '{
  "name": "string",
  "onSale": true,
  "cost": 0,
  "imagePath": "string",
  "tags": [
    "string"
  ]
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json'
};

fetch('http://localhost:3000/api/ads',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`POST /api/ads`

Create an ad

> Body parameter

```json
{
  "name": "string",
  "onSale": true,
  "cost": 0,
  "imagePath": "string",
  "tags": [
    "string"
  ]
}
```

<h3 id="post-api-ads-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[ad](#schemaad)|false|none|

> Example responses

> 201 Response

```json
{
  "name": "string",
  "onSale": true,
  "cost": 0,
  "imagePath": "string",
  "tags": [
    "string"
  ],
  "_id": "string"
}
```

<h3 id="post-api-ads-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|Created|[ad](#schemaad)|

<aside class="success">
This operation does not require authentication
</aside>

## delete-api-ads-id

<a id="opIddelete-api-ads-id"></a>

> Code samples

```javascript

fetch('http://localhost:3000/api/ads/{id}',
{
  method: 'DELETE'

})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`DELETE /api/ads/{id}`

Delete an ad with the identifier

<h3 id="delete-api-ads-id-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|string|true|none|

<h3 id="delete-api-ads-id-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|204|[No Content](https://tools.ietf.org/html/rfc7231#section-6.3.5)|No Content|None|

<aside class="success">
This operation does not require authentication
</aside>

# Schemas

<h2 id="tocS_ad">ad</h2>
<!-- backwards compatibility -->
<a id="schemaad"></a>
<a id="schema_ad"></a>
<a id="tocSad"></a>
<a id="tocsad"></a>

```json
{
  "name": "string",
  "onSale": true,
  "cost": 0,
  "imagePath": "string",
  "tags": [
    "string"
  ],
  "_id": "string"
}

```

ad

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|name|string|false|none|none|
|onSale|boolean|false|none|none|
|cost|number|false|none|none|
|imagePath|string|false|none|none|
|tags|[string]|false|none|none|
|_id|string|false|read-only|none|

