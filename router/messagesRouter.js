const express = require('express');
const mysql = require('mysql');
const router = express.Router();
const connection = require("../db");
const { detectLanguage, translateText } = require("../utils/translateFunctions")
const { sendMail } = require("..//utils/mailFunctions")
const { LANGUAGE_ISO_CODE} = require("../utils/dictionaries")

// GET ALL MESSAGES
router.get("/", (req, res) => {
    connection.query("SELECT * FROM messages", (err, results) => {
        if (err) {
            return res.send(err);
        }

        return res.json({
            data: results,
        });
    });
});

// GET 1 message (1 message by ID)
router.get("/:id", (req, res) => {
    const { id } = req.params;
    connection.query(`SELECT * FROM messages where entryID = ${mysql.escape(id)} `, (err, results) => {
        if (err) {
            return res.send(err);
        }
        
        if(results.length === 0 )
        {
            return res.status(400).json({
                error: "No entry with that ID"
            }) ;
        }

        return res.json({
            data: results,
        });

    });
});


// Insert in DB
router.post("/", (req, res) => {
    console.log(req.body);
    const {
        senderName,
        senderMail,
        receiverMail,
        messageContent,

    } = req.body;

    if (!senderName || !senderMail || !receiverMail || !messageContent) {
        return res.status(400).json({
            error: "All fields are required",

        })
    }

    connection.query(`INSERT into messages(senderName, senderMail, receiverMail, messageContent) values (${mysql.escape(senderName)}, ${mysql.escape(senderMail)}, ${mysql.escape(receiverMail)}, ${mysql.escape(messageContent)})`, (err, results) => {
        if (err) {
            return res.send(err);
        }

        return res.json({
            results,
        });
    });



});

// Delete a DB entry
router.delete("/:id", (req, res) => {
    const { id } = req.params;
    if (!id) {
        // send bad request error
        return res.status(400).send("Bad request. Missing parametres.");
    }
    const queryString = `DELETE FROM messages where entryID = ${mysql.escape(id)}`;
    connection.query(queryString, (err, results) => {
        if (err) {
            return res.send(err);
        }

        return res.json({
            results,
        });
    }
    );
}
);


//UPDATE entry by ID
router.put("/:id", (req, res) => {
const {id} = req.params;
const {
    senderName,
    senderMail,
    receiverMail,
    messageContent,
} = req.body;

    if (!senderName || !senderMail || !receiverMail || !messageContent){
        return res.status(400).json({
            error:"All fields are required",
        })
    }

    connection.query(`UPDATE messages SET senderName = ${mysql.escape(senderName)}, senderMail = ${mysql.escape(senderMail)}, receiverMail = ${mysql.escape(receiverMail)}, messageContent = ${mysql.escape(messageContent)} WHERE entryID = ${mysql.escape(id)}`, (err, results) => {
        if (err) {
            return res.send(err);
        }
        if (results.length === 0) {
            return res.status(404).send("Message not found.");
        }
        return res.json({
            results,
        });
    });

});


//send and translate mail
router.post("/foreign", async (req, res) => {
    const { senderName, senderMail, receiverMail, messageContent, language } = req.body;

    if (!senderName || !senderMail || !receiverMail || !messageContent || !language){
        return res.status(400).json({
            error:"All fields are required",
        })
    }
    if (!LANGUAGE_ISO_CODE[language] && language !== "ALL")
    {
        return res.status(400).send("Invalid language!");
    }

    let translationData = {};


    try {   
        if(LANGUAGE_ISO_CODE[language]){
            const translatedText = await translateText(messageContent, LANGUAGE_ISO_CODE[language]);
            translationData.translatedText = translatedText[0];
        }
        
        if(language === "ALL"){
            const availableLanguages = Object.values(LANGUAGE_ISO_CODE);

            const translatedAnswersArray = await Promise.all(
                availableLanguages.map( async (language) => {
                    const translatedText = await translateText(messageContent, language); 
                    return translatedText[0];
                })
            )

            translationData.translatedText = translatedAnswersArray.reduce(
                (acc, curr) => {
                    return acc + curr + "\n"
                }, ""
            )     

        }
        else{
            return res.send("invalid language");
        }

        sendMail(receiverMail, senderMail, translationData.translatedText, `${senderName} has just sent you a message` );

        connection.query(`INSERT into messages(senderName, senderMail, receiverMail, messageContent) values (${mysql.escape(senderName)}, ${mysql.escape(senderMail)}, ${mysql.escape(receiverMail)}, ${mysql.escape(messageContent)})`, (err, results) => {
            if (err) {
                console.log(err);
                return res.send(err);
            }

            return res.json({
                translationData,
            })
        })
    }


    
    catch(err){
            console.log(err);
            return res.send(err);
    }
})

module.exports = router;
