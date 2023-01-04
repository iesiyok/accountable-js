
# SHELL := /bin/bash
# $(TARGET)=/etc/nginx/sitens/accountable-js.org
TARGET=$(CURDIR)




PREFIX=test
project?=$(PREFIX)
n=1
max=30
NAME=$(project)
data?=""

all:
	@echo "*	type 'make renew_sxg' : Refreshes the sxg signatures for case study websites and nimiq apps (should be done)"
	@echo "*	type 'make new project=test' : for creating a new project with a template called test (if the name exists, make will try test_1, test_2 etc. )"
	@echo "*	type 'make new' : for creating a new project (make will try the name 'test' then test_1, test_2 etc.) "
	@echo "*	type 'make sxg_keys' : for creating necessary SXG keys (already done, needed only once)"


renew_sxg:
	cd sites/helloworld ;\
	make docker_gen uri=index.html data=index.json ;\
	cd ../jquerytrusted ;\
	make docker_gen uri=index.html data=index.json ;\
	cd ../casedelegatetrust ;\
	make docker_gen uri=index.html data=index.json ;\
	cd ../untrustedadsensenimiq ;\
	make docker_gen uri=index.html data=index.json ;\
	cd ../whatsapp ;\
	make docker_gen uri=index.html data=index.json ;\
	cd ../wallet ;\
	make docker_gen uri=index.html data=index.json ;\
	cd ../compart ;\
	make docker_gen uri=index.html data=baseline.json ;\
	make docker_gen uri=index.html data=wallet.json ;\
	make docker_gen_keyguard uri=index.html data=keyguard.json ;\
	cd ../.. ;


sxg_keys:
	cd keys ; \
	openssl ecparam -out priv.key -name prime256v1 -genkey ; \
	openssl req -new -sha256 -key priv.key -out cert.csr -subj '/CN=localhost/O=Test/C=US' ; \
	echo "1.3.6.1.4.1.11129.2.1.22 = ASN1:NULL\nsubjectAltName=DNS:localhost" > ext ; \
	openssl x509 -req -days 90 -in cert.csr -signkey priv.key -out cert.pem -extfile ext ; \
	echo "ocsp" > ocsp ; \
	gen-certurl -pem cert.pem -ocsp ocsp > cert.cbor ;

# gen_sxg:
# 	d=$(notdir $(CURDIR)) ; \
# 	gen-signedexchange \
#   -uri http://localhost/$d/manifest.html \
#   -content $(data) \
#   -certificate $(CURDIR)/keys/cert.pem \
#   -privateKey $(CURDIR)/keys/priv.key \
#   -certUrl http://localhost/keys/cert.cbor \
#   -validityUrl http://localhost/resource.validity.msg \
#   -o $(data).sxg ; \


new:
	cd $(TARGET)/sites ; \
	n=$(n) ; \
	NAME=$(NAME) ; \
	if [ -a $(project) ] ; \
		then \
			echo "Folder '$(project)' exists" ; \
			while [ $${n} -le $(max) ] ; do \
				if [ -a $(project)_$${n} ] ; \
					then \
						echo "Folder '$(project)_$${n}' exists" ; \
						n=`expr $${n} + 1` ; \
					else \
						NAME=$(project)_$${n} ; \
						break ; \
					fi; \
			done; \
		fi; \
	mkdir $${NAME} ;\
	cd $${NAME} ;\
	echo "<html>\n\t<head>\n\t\t \
		<link rel=\"shortcut icon\" href=\"#\">\n\t</head>\n \
		<body>\n\t</body>\n</html>\n" > index.html ; \
	echo "{\n\t\"name\" : \"Javascript list\", \
		\n\t\"version\" : \"1.0\", \
		\n\t\"manifest_version\" : \"1\", \
		\n\t\"URL\" : \"https://localhost/$${NAME}/index.html\", \
		\n\t\"description\" : \"List of Javascript Files\", \
		\n\t\"contents\" : [ \
		\n\t\t{ \
		\n\t\t\t\"seq\" : 1, \
		\n\t\t\t\"type\" : \"\" \
		\n\t\t} \
		\n\t] \
		\n}" > index.json ; \
	ln -s ../../tmp/Makefile . ; \
	echo "project $${NAME} template has been created" ; \
    true
# 	while [ $n -le $(max) ] ; do \
# 		echo "This is test" ; \
# 		n=`expr $n + 1` ; \
# 	done ; \
# 	true
	



# if [ -a $(project)$n ] ; \
# 		then \
# 			echo "File exists" ; \
# 		else \
# 			mkdir $(project)$n ; \
# 		fi;