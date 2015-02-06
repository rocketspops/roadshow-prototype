#!/bin/bash
#
# script to build website and push it to http://innovation.transis.net

# create a tmp dir into which jekyll will build the html source
if [ -d "/tmp/jekyll_build" ]; then
    rm -rf /tmp/jekyll_build
fi
mkdir /tmp/jekyll_build

# build website
bundle exec jekyll build -d /tmp/jekyll_build/

# publish on github only if jekyll build was successful
if [ $? -eq 0 ]; then
    cd /tmp/jekyll_build
    find /tmp/jekyll_build/ -type f -exec chmod 644 {} \;
    rsync -r /tmp/jekyll_build/* centro@innovation.transis.net:/data/innovation/current/public/prototypes
    echo "Successfully built and published to http://innovation.transis.net..."
else
    echo "Jekyll build failed... not publishing to http://innovation.transis.net"
fi

# cleanup
rm -rf /tmp/jekyll_build
