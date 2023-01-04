uri?=""
data?=""

all:
	@echo "*	'make docker_gen uri=index.html data=baseline.json' : for signing baseline sxg of nimiq wallet\n\
	*	'make docker_verify data=baseline.sxg' : for verifying baseline sxg of nimiq wallet\n\
	*	'make docker_gen uri=index.html data=wallet.json' : for signing nimiq wallet for compart evaluation\n\
	*	'make docker_verify data=wallet.sxg' : for verifying sxg of nimiq wallet in compart evaluation\n\
	*	'make docker_gen_keyguard uri=index.html data=keyguard.json' : for signing nimiq keyguard (with different keys) for compart evaluation\n\
	*	'make docker_verify_keyguard data=keyguard.sxg' : for verifying sxg of nimiq keyguard (with different keys) in compart evaluation\n"



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


docker_generate_sxg_keyguard:
	gen-signedexchange \
	-uri https://localhost:8085/$(notdir $(CURDIR))/$(uri) \
	-content $(data) \
	-certificate /keys/keyguard/cert2.pem \
	-privateKey /keys/keyguard/priv2.key \
	-expire=604800s \
	-certUrl https://accountable-js.org/cert/cert2.cbor \
	-validityUrl https://localhost:8085/resource.validity.msg \
	-o $(basename $(data)).sxg ; 


docker_verify_sxg_keyguard:
	dump-signedexchange -i $(data) -verify -cert /keys/keyguard/cert2.cbor ;



docker_gen:
	docker exec -t -i manifest-con /bin/bash -c "cd $(notdir $(CURDIR)) && make docker_generate_sxg uri=$(uri) data=$(data)"

docker_verify:
	docker exec -t -i manifest-con /bin/bash -c "cd $(notdir $(CURDIR)) && make docker_verify_sxg data=$(data)"



docker_gen_keyguard:
	docker exec -t -i manifest-con /bin/bash -c "cd $(notdir $(CURDIR)) && make docker_generate_sxg_keyguard uri=$(uri) data=$(data)"

docker_verify_keyguard:
	docker exec -t -i manifest-con /bin/bash -c "cd $(notdir $(CURDIR)) && make docker_verify_sxg_keyguard data=$(data)"
