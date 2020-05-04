const { db } = require('../util/admin');

exports.getAllProducts = (req, res) => {
    db
        .collection('products')
        .orderBy('createdAt', 'desc')
        .get()
        .then( data => {
            let products = []
            data.forEach( doc => {
                products.push({
                    productId: doc.id,
                    userHandle: doc.data().userHandle,
                    ...doc.data()
                })
            })
            return res.json(products)
        })
        .catch( err => console.log(err))

}

exports.postOneProduct = (req, res) => {
    const newProduct = {
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        userHandle: req.user.handle,
        discount: req.body.discount,
        discountDate: req.body.discountDate,
        createdAt: new Date().toISOString() 
    }

    db
        .collection('products')
        .add(newProduct)
        .then( doc => {
            res.json({ message: `document ${doc.id} created successfully` })
        } )
        .catch( err => {
            res.status(500).json({ error: 'something went wrong' })
        })
}

exports.deleteOneProduct = (req, res) => {
    const document = db.doc(`/products/${req.params.id}`)
    document.get()
        .then( doc => {
            console.log(doc)
            if (!doc.exists) {
                return res.status(404).json({ error: 'Product not found' })
            }
            if (doc.data().userHandle !== req.user.handle) {
                console.log(doc.data().userHandle !== req.user.handle)
                return res.status(403).json({ error: 'Unauthorized'})
            } else {
                return document.delete()
            }
        })
        .then( () => {
            res.json({message: 'Product deleted successfully'})
        })
        .catch( err => {
            console.error(err)
            return res.status(500).json({ error: err.code })
        })
}

exports.changedOneProduct = (req, res) => {
    console.log(req.params.id)
    const updateProduct = {
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        userHandle: req.user.handle,
        discount: req.body.discount,
        discountDate: req.body.discountDate,
        createdAt: new Date().toISOString() 
    }
    const file  = db.doc(`/products/${req.params.id}`)
       file.get()
        .then( doc => {
            console.log('DOC', doc)
            if (!doc.exists) {
                return res.status(404).json({ error: 'Product not found' })
            }
            if (doc.data().userHandle !== req.user.handle) {
                return res.status(404).json({ error: 'Unauthorized'})
            } else {
               db.collection('products').doc(req.params.id)
                .update(updateProduct)
                .then(doc => {
                    res.json({ message: `document ${doc.id} created successfully` })
                } )
                .catch( err => {
                    res.status(500).json({ error: 'something went wrong' })
                })
            }
        })
        .catch( err => {
            res.status(500).json({ error: 'something went wrong' })
        })
    }
