<h3>Manifest Directives</h3>

The manifest file should contain the list of all active contents 
in the same order they appear in the Html document of the web page. 
The file is in a JSON tree format.
The manifest file may contain the following directives in the top level
that gives general information about the web page, transparency logs and the developer:

<ul>
	<li> "name" : name of the manifest file (optional). </li>
	<li> "version" : version number of the manifest file (required).</li>
	<li> "description" : short description of the manifest file (optional).</li>
	<li> "url" : the URL of the website (required).</li>
	<li> "contents" : the list of the active contents are under this key.</li>
	
</ul>

The following keys can be used in the second level (under contents key): some of the keys may be required depending on the type of the active content. 

<ul>
	<li> "seq" : the sequence number of the content (optional if the content is dynamic).</li>
	<li> "name" : name of the content (optional).</li>
	<li> "version" : version number of the content (optional).</li>
	<li> "type" : the type of the content. It can be "inline", "eventhandler", "external" or "iframe". The mantype is required for each manifest section.</li>
	<li> "trust" : the trust setting of the content declaration. It can be "assert", "blindtrust", "delegate". The trust setting is required for the external and iframe types.</li>
	<li> "srctype" : iframe resource type. The value can be "external", "script" or "srcdoc". It is optional and default value is "external". If the value is "external" then mansrc directive's value must be a URL, whereas for "script" or "srcdoc",
	a manhash value must be given in mansrc attribute.</li>
	<li> "src" : If the mantype is "external" or "iframe" then it is also required. 
	For external a URL is expected. For iframe the value depends on the mansrctype 
	as stated above. It's also required if the content is blindly trusted by the developer and a URL is always expected in this case.</li>
	<li> "srctype" : iframe resource type. The value can be "external", "script" or "srcdoc". It is optional and default value is "src". </li>
	<li> "src" : iframe source (required for iframes). The value depends on the mansrctype. It can be a URL for "link", a hash value for "script" and "srcdoc". By default a URL is expected if "srctype" is not given.</li>
	<li> "sandbox" : Required if the content is iframe and the trust is "blindtrust".</li>
	<li> "hash" : if the trust is set for assert (or not given), the cryptographic hash is required. Supported hash algorithms are sha256, 384 and 512. The format is the prefix that shows the hash algorithm followed by a dash e.g. "sha256-" and base-64 encoded hash of the resource.
	% That is the name of the hash method followed by a dash and followed by a base64 on the hash result.</li>
	<li> "crossorigin" : the CORS setting attribute. If the content is external, this is required. </li>
	<li> "dynamic" : indicates  whether element is part of the initial DOM or dynamically added after the Window load event.  Optional with default value `false'.</li>
	<li> "load" : indicates if the script is loaded synchronously or asynchronously. The value can be "sync", "async" or "defer". It is optional and the default value is "sync".</li>
	<li>"persistent" : Indicates if the content is removed from the DOM at some point in the lifespan of the window</li>
</ul>
