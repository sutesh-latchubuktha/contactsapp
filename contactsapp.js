const express = require('express');
const http = require('http');
const path = require('path');
const port = process.env.PORT||8000;
const app = express();
app.use(express.urlencoded());
app.use(express.static('assets'));
var contact_list = [
    {
        name: "Ant Mn",
        number: 9876543210
    },
    {
        name: "Iron Man",
        number: 9999988888

    },
    {
        name: "Bat Man",
        number: 8888866666

    },
    {
        name: "Hulk",
        number: 7777766666

    }


];

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', function (req, res) {

    return res.render("contacts", {
        title: "contacts",
        contacts: contact_list
    });
});
app.post('/create-contact', function (req, res) {
    contact_list.push({
        name: req.body.fname,
        number: req.body.pnumber
    });
    return res.redirect("/");


});
app.get('/delete-contact/', function (req, res) {
    let num = req.query.pnumber;

    let index = contact_list.findIndex(function (contact) {
        return contact.number == num;
    });
    console.log(index);
    if (index != -1) {
        contact_list.splice(index, index + 1);
    }
    return res.redirect("/");


});



app.listen(port, function (err) {
    if (err) {
        console.log('error in running the server', err);
    }
    console.log('server is running');


});
