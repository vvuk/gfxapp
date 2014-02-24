all: gfxapp.zip

.PHONY: gfxapp.zip

gfxapp.zip:
	cat package.manifest | grep -v package_path | sed 's,"/~vladimir/misc/gfxapp/,"/,g' > manifest.webapp
	rm -f gfxapp.zip && zip -9r gfxapp.zip index.html package.manifest manifest.webapp assets tests

push: gfxapp.zip
	scp gfxapp.zip people.mozilla.com:web/misc/gfxapp
	ssh people.mozilla.com 'cd web/misc/gfxapp; unzip -o gfxapp.zip'
