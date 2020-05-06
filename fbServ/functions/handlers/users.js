const { admin, db } = require("../util/admin")
const config = require("../util/config");

const { validateSignupData, validateLoginData } = require("../util/validators");

const firebase = require("firebase")
firebase.initializeApp(config)

exports.signUp = (req, res) => {
    const newUser = {
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
    handle: req.body.handle,
  }
    const { valid, errors } = validateSignupData(newUser)  
    
	if (!valid) return res.status(400).json(errors)

    //get token 
    let token, userId
    db.doc(`/users/${newUser.handle}`).get()
        .then( doc => {
            if (doc.exists) {
                return res.status(400).json({ handle: 'this handle is alredy taken' })
            } else {
                return firebase 
                    .auth()
                    .createUserWithEmailAndPassword(newUser.email, newUser.password)

            }
        })
        .then( data => {
            userId = data.user.uid
            return data.user.getIdToken()
        } )
        .then( idToken => {
            token = idToken
            const userCredentials = {
                handle: newUser.handle,
                email: newUser.email,
                createdAt: new Date().toISOString(),
                userId,
            }
            return db.doc(`/users/${newUser.handle}`).set(userCredentials)
        })
        .then( () => {
            return res.status(201).json({ token })
        })
        .catch( err => {
            if (err.code === 'auth/email-already-in-use'){
                return res.status(400).json({email: 'Alredy in use'})
            }else {
                return res.status(500).json({ error: err.code })
            }
        })
   }

exports.logIn = (req, res) => {
    const user = {
        email: req.body.email,
        password: req.body.password,
    }

    const { valid, errors } = validateLoginData(user)  
    
    if (!valid) return res.status(400).json(errors)

    firebase.auth().signInWithEmailAndPassword(user.email, user.password)
        .then( data => {
            return data.user.getIdToken()
        })
        .then( token => {
            return res.json({token})
        } )
        .catch( err => {
            if (err.code === 'auth/wrong-password'){
                return res.status(403).json({ general: 'Wrong credentials, please try again'})
                }
            return res.status(500).json({ error: err.message})
        })
}

//Upload image
exports.uploadImage = (req, res) => {
    const BusBoy = require("busboy")
    const path = require("path")
    const os = require("os")
    const fs = require("fs")


    console.log(req.params)
    let imageToBeUploaded = {}
    let imageFileName

    const busboy = new BusBoy({ headers: req.headers })

    busboy.on("file", (fieldname, file, filename, encoding, mimetype) => {
        const imageExtension = filename.split(".")[filename.split(".").length - 1]
        imageFileName = `${Math.round(Math.random() * 1000000000000).toString()}.${imageExtension}`
        const filepath = path.join(os.tmpdir(), imageFileName)
        imageToBeUploaded = { filepath, mimetype }
        file.pipe(fs.createWriteStream(filepath))
    })
    busboy.on('finish', () => {
        admin
            .storage()
            .bucket()
            .upload(imageToBeUploaded.filepath, {
                resumable: false, 
                metadata: {
                    metadata: {
                    contentType: imageToBeUploaded.mimetype
                    }
                }
            })
            .then( () => {
                const document = db.doc(`/products/${req.params.id}`)
                document.get()
                    .then( doc => {
                        if (doc.data().userHandle !== req.user.handle) {
                            console.log(doc.data().userHandle !== req.user.handle)
                            return res.status(403).json({ error: 'Unauthorized'})
                        } else {
                            const imageUrl = `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/${imageFileName}?alt=media`
                            const productId = req.params.id
                            return db.doc(`/products/${productId}`).update({ imageUrl })
                        }
                    })
                    .catch( err => { return res.json({ message: 'wrong upload'})})
            })
            .then( () => {
                return res.json({ message: "image uploaded successfully" })
            })
            .catch( err => {
                console.error(err);
                return res.status(500).json({ error: "something went wrong" })
            })
    })
    busboy.end(req.rawBody)
}
