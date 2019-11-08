# Explain

Image compress generator, Reduce package volume. <br>
compliant：jpg、jpeg、png、svg、gif

# Install

```
npm i imagemin-compress -D
```

# Usage

## Commander

Using the command line to compress images.
The files dest value is the same, the compressed picture will overwrite the original picture, Will not retain the original image, Will be applied to the build to the directory。

```
imagemin-compress -f[--files] -d[--dest] -c[--config]
```

## Npm scripts
Using <code>package.json</code>: <br><br>

```
{
  "scripts": {
    ...,
    "imagemin": "imagemin-compress -f ./images -d ./imagesmin"
  }
}
```

| param  | type   | explain                                                                       |
| ------ | ------ | ----------------------------------------------------------------------------- |
| files  | string | Image catalog name                                                            |
| dest   | string | Directory name of output, defalut: files value                                |
| config | object | Configuration file, default: <code>imagemin.config.js</code>, return "object" |

## API

The way used in script files, Return Promise class.<br>
Specific reference to the following script examples:

```
const imageminCompress = reqiure('imagemin-compress')

imageminCompress(options).then(_ => {})

or:

const compile = async options => await imageminCompress(options)
```

## Reference

Options params: <br><br>
Extended:

| key     | type                 | value explain                                             |
| ------- | -------------------- | --------------------------------------------------------- |
| files   | string/pattern/array | glob type path value                                      |
| dest    | string               | Directory name of output, defalut: "files" value          |
| verbose | boolean              | Output compress inforamtion, default: true                |
| quality | array                | Picture compression mass range value, default: [0.6, 0.8] |

Specific instructions can be referred to link: [imagemin](https://www.npmjs.com/package/imagemin)
