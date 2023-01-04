uri?=""
data?=""

all:
	@echo "*	'make gen_sxg uri=index.html data=index.json' : for creating a signed exchange from a manifest file index.json\n\
	*	'make verify_sxg data=index.sxg' : for verifying a signed exchange\n\
	*	'make docker_gen uri=index.html data=index.json' : for creating an sxg on docker\n\
	*	'make docker_verify data=index.sxg' : for verifying an sxg on docker"


gen_sxg:
	gen-signedexchange \
	-uri https://localhost:8085/$(notdir $(CURDIR))/$(uri) \
	-content $(data) \
	-certificate ../../keys/cert.pem \
	-privateKey ../../keys/priv.key \
	-expire=604800s \
	-certUrl https://accountable-js.org/cert/cert.cbor \
	-validityUrl https://localhost:8085/resource.validity.msg \
	-o $(basename $(data)).sxg ; 


verify_sxg:
	dump-signedexchange -i $(data) -verify -cert ../../keys/cert.cbor ;



docker_generate_sxg:
	gen-signedexchange \
	-uri https://localhost:8085/$(notdir $(CURDIR))/$(uri) \
	-content $(data) \
	-certificate /keys/cert.pem \
	-privateKey /keys/priv.key \
	-expire=604800s \
	-certUrl https://accountable-js.org/cert/cert.cbor \
	-validityUrl https://localhost:8085/resource.validity.msg \
	-o $(basename $(data)).sxg ; 


docker_verify_sxg:
	dump-signedexchange -i $(data) -verify -cert /keys/cert.cbor ;



docker_gen:
	docker exec -t -i manifest-con /bin/bash -c "cd $(notdir $(CURDIR)) && make docker_generate_sxg uri=$(uri) data=$(data)"

docker_verify:
	docker exec -t -i manifest-con /bin/bash -c "cd $(notdir $(CURDIR)) && make docker_verify_sxg data=$(data)"

