#!/usr/bin/env bash

main(){
    printStart
    permission=$( askForInput "Are you sure you want to publish a new version? (y/n)")
    if [ "$permission" != "y" ]
    then
        printEnd
        exit 1
    fi
    comment=$( askForInput "About this version...")
    IFS=$'\n' read -d '' -ra values < <(awk -F\" 'NF>=3 {print $4}' package.json)
    publish ${values[0]} ${values[1]} "$comment"
}

publish(){
    echo
    echo >&2 "Uploading build : $1-v$2"
    echo >&2 "Notes : $3"
    zip -r "$1-v$2.zip" "dist"
    curl -X POST https://graph-video.facebook.com/1988364724816184/assets -F "access_token=EAAYsfZAxiFmMBAKHmz17UdnsXfEr3UJ9UKaXkuP1zip2XzUiDxijRZBtuItgjqC6tZCR7jQjToScJT25r4Kg6tajZCHl2eYlZA8dFZBAdX1DNarwen0wKCBWQXLLE6kbV9MPYnny4BwgucNTGdxRgMcJRxj9ccyVvEYdsOiGFeGgZDZD" -F "type=BUNDLE" -F "asset=@./$1-v$2.zip" -F "comment=$3"
    rm -rf "$1-v$2.zip"
    echo
    printEnd
}

printStart () {
    echo -n "========= Publish Start ========="
    echo
}

printEnd () {
    echo -n "========= Publish End ========="
    echo
}

askForInput(){
    echo >&2 $1
    read answer
    echo "$answer"
}

main
