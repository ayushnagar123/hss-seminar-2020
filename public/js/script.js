var stripeHandeler = StripeCheckout.configure({
    key: stripePublicKey,
    locale: 'en',   
    token: function(token){
        console.log(token)
        fetch('/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                stripeTokenId: token.id,
            })
        }).then(function(res) {
            return res.json()
        }).then(function(data) {
            alert(data.message)
            updateCartTotal()
        }).catch(function(error) {
            console.error(error)
        })
    }
})
document.getElementById('pay').addEventListener('click',()=>{
    console.log('pay')
    var price = 0
    stripeHandeler.open({
        amount: 0
    })
})