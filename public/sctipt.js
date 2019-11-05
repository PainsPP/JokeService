setOnClick();
update();

function update(){
    document.querySelector('oprettedeJokes').innerHTML = '';
    for(let input of document.querySelector('input')) input.value = ' ';
    getJokes();
    console.log("**UPDATED**")
}

async function getJokes() {
    const [template, jokeResponse] = await Promise.all(
        [fetch('jokes.hbs'), fetch('/joke')]);
    const [templateText, jokes] = await Promise.all(
        [template.text(), jokeResponse.json()]);
    const compiledTemplate = Handlebars.compile(templateText);
    let jokesHTML = '';
    let optionsHTML = '';
    jokes.forEach(joke => {
        jokesHTML += compiledTemplate({
            setup: joke.setup,
            punchline: joke.punchline
        });
        optionsHTML += '<option data="' + joke._id +'">' + joke.setup +'</option>';
    });
        document.querySelector('oprettedeJokes').innerHTML = jokesHTML;
};

//onclick
function setOnClick() {
    console.log("Entered OnClick")
    document.querySelector('knapOpretJoke').onclick = () => {
        const joke = {
            setup: document.querySelector('setup').value
        };
        punchline: document.querySelector('punchLine').value,
            fetch('/jokes', {
                method: "POST",
                body: JSON.stringify(joke),
                headers: {'Content-Type': 'application/json'}
            }).then(response => {
                if (response.status >= 400)
                    throw new Error(response.status);
                else
                    update();
                return response.json();
            })
                .then(resultat => console.log(`Resultat: %o`, resultat))
                .catch(fejl => console.log('Fejl: ' + fejl));
    };
}