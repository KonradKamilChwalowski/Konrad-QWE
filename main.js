const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')

let state = {}

function startGame(){
    state = {}
    renderScene("Start1")
}

function renderScene(Scene_id){
    const Scene = Scenes.find(Scene => Scene.id === Scene_id)
    document.body.style.backgroundImage = Scene.tlo
    textElement.innerText = Scene.text /*ustala tekst okienka*/
    while (optionButtonsElement.firstChild){ /*usuwa guziki*/
        optionButtonsElement.removeChild(optionButtonsElement.firstChild)
    }

    Scene.options.forEach(option => { /*Tworzy guziki*/
        if(showOption(option)){
            const button = document.createElement('button')
            button.innerText = option.text
            button.classList.add('btn')
            button.addEventListener('click', () => selectOption(option))
            optionButtonsElement.appendChild(button)
        }
    })
}

function showOption(option){
    return option.requierdState == null || option.requierdState(state)
}

function selectOption(option){
    const next_Scene_id = option.nextText
    if(next_Scene_id <= 0){
        return startGame()
    }
    state = Object.assign(state, option.setState)
    renderScene(next_Scene_id)
}

const Scenes = [
    {
        id: "Start1",
        text: 'Pusta sala, ciemno, praktycznie czarno, na stole banan, a na termometrze 16 stopni Celsjusza. Za zimno na koszulkę, ale za ciepło na bluzę…',
        tlo: 'url("img/Sala.png")',
        options: [
            {
                text: 'Dalej',
                nextText: "Start2"
            }
        ]
    },
    {
        id: "Start2",
        text: 'NAGLE: GŁOŚNY HUK I OŚLEPIAJĄCY BŁYSK!',
        tlo: 'url("img/Blysk.png")',
        options: [
            {
                text: 'Dalej',
                nextText: "Start3"
            }
        ]
    },
    {
        id: "Start3",
        text: 'Pojawia się przed Wami… CHWAŁKONATOR T-700. „Gdzie jest CEL: Michał Rzepka?”',
        tlo: 'url("img/Cyborg.png")',
        options: [
            {
                text: '"Kim jesteś?" (rozmowa)',
                nextText: "Kim_jesteś"
            },
            {
                text: '"Dlaczego pytasz o Dyro?" (rozmowa)',
                nextText: "Czemu_Dyro"
            },
            {
                text: '"Wiemy gdzie jest Dyro, też chcemy z nim walczyć!" (rozmowa)',
                nextText: "Nie_uda_sie_wam"
            },
            {
                text: 'Rzuć bananem w T-700 (walka)',
                nextText: "Banan"
            }
        ]
    },
    {
        id: "Kim_jesteś",
        text: '"Jestem niezniszczalnym cyborgiem z przyszłości, a Ty?"',
        tlo: 'url("img/Cyborg.png")',
        options: [
            {
                text: '"Jestem obrońcą tej szkoły! Próbuję odczarować zły urok!" (rozmowa)',
                nextText: "Nie_uda_sie_wam"
            },
            {
                text: '"To ja jestem Michał Rzepka, lepiej ze mną nie zaczynaj!" (blef)',
                nextText: "Walka"
            },
            {
                text: '"Jestem zaledwie uczniem tej szkoły, nie zwracaj na mnie uwagi!" (rozmowa)',
                nextText: "Chęć_pomocy"
            },
            {
                text: '"Nie ważne jak mam na imię, bo za chwilę wszyscy będą mnie znać jako łowcę androidów!" (walka)',
                nextText: "Walka"
            }
        ]
    },
    {
        id: "Nie_uda_sie_wam",
        text: '"Poniesiecie porażkę! CEL-u nie da się już uratować"',
        tlo: 'url("img/Cyborg.png")',
        options: [
            {
                text: '"Nie dam Ci go zlikwidować! Najpierw będziesz musiał rozprawić się ze mną!" (walka)',
                nextText: "Walka"
            },
            {
                text: '"W takim razie zgładźmy go razem!" (rozmowa)',
                nextText: "Chęć_pomocy"
            },
            {
                text: '"Mamy coś co może mu zaszkodzić, zobacz proszę" (zaprezentuj broń)',
                nextText: "Zaprezentuj_broń"
            },
            {
                text: '"Mamy coś co może mu zaszkodzić!" (machnij pokazowo bronią)',
                nextText: "Walka"
            }
        ]
    },
    {
        id: "Zaprezentuj_broń",
        text: 'Cyborg skanuje broń po czym mówi: "Ta broń jest bezużyteczna."',
        tlo: 'url("img/Cyborg.png")',
        options: [
            {
                text: '"Sam jesteś bezużyteczny!" Rzuć bananem w T-700 (walka)',
                nextText: "Banan"
            },
            {
                text: '"Jak to bezużyteczna?! Co w takim razie może go zranić?!" (rozmowa)',
                nextText: "Mam_ostrze"
            },
            {
                text: '"Jak masz lepszą to może się sprawdzimy?" Wyceluj w T-700 bronią (walka)',
                nextText: "Walka"
            },
            {
                text: '"Jeśli masz lepszą broń, to może faktycznie ty się tym zajmij. Dyra znajdziesz w sekretariacie" (zakończ rozmowę)',
                nextText: "Koniec_czasu"
            }
        ]
    },
    {
        id: "Mam_ostrze",
        text: '"Dyrektor jest uczulony na ściemnianie, a moje ostrze posiada esencję ze ściemnionej materii"',
        tlo: 'url("img/Cyborg.png")',
        options: [
            {
                text: '"ŚCIEMNIONA MATERIA?! JEŚLI GO TYM ZABIJESZ, ZNISZCZYSZ CONTINUUM CZASOPRZESTRZENNE!" (rozmowa)',
                nextText: "Sukces"
            },
            {
                text: '"My też umiemy całkiem dobrze ściemniać, pokonamy go razem!" (rozmowa)',
                nextText: "Chęć_pomocy"
            },
            {
                text: '"Zaraz, a tak w ogóle, to dlaczego chcesz zabić Dyra?" (rozmowa)',
                nextText: "Czemu_Dyro"
            },
            {
                text: '"Jeśli masz lepszą broń, to może faktycznie ty się tym zajmij. Dyra znajdziesz w sekretariacie" (zakończ rozmowę)',
                nextText: "Koniec_czasu"
            }
        ]
    },
    {
        id: "Czemu_Dyro",
        text: '"Pochodzę z przyszłości w której CEL wybił całą ludzkość. Muszę go zlikwidować, póki to możliwe"',
        tlo: 'url("img/Cyborg.png")',
        options: [
            {
                text: '"Nikogo nie będziesz likwidować, dopóki jestem uczniem Linde!" (walka)',
                nextText: "Walka"
            },
            {
                text: '"W jaki sposób ktoś taki jak Dyro wybił ludzkość?" (rozmowa)',
                nextText: "Jak_dyro_wygral"
            },
            {
                text: '"Niemożliwe, przecież próbujemy go odczarować!" (rozmowa)',
                nextText: "Nie_uda_sie_wam"
            },
            {
                text: '"W takim razie trzeba bestie ubić, jaki masz plan?" (rozmowa)',
                nextText: "Mam_ostrze"
            }
        ]
    },
    {
        id: "Jak_dyro_wygral",
        text: '"Ucząc HiT-u Dyro poznał zaklęcie <Karto Praconium>, które nakazuje przeciwnikowi wypełnić kartę pracy. Mimowolnie piszącego przeciwnika pożera."',
        tlo: 'url("img/Cyborg.png")',
        options: [
            {
                text: '"O NIE, TYLKO NIE KARTA PRACY Z HiT-u! Dyro jest w sekretariacie!" (koniec rozmowy)',
                nextText: "Koniec_czasu"
            },
            {
                text: '"W takim razie trzeba bestie ubić, jaki masz plan?" (rozmowa)',
                nextText: "Mam_ostrze"
            },
            {
                text: '"W takim razie powstrzymamy go!" (rozmowa)',
                nextText: "Nie_uda_sie_wam"
            },
            {
                text: '"Nie wierzę w te brednie! Karta pracy z HiT-u? Lepiej zacznij mówić prawdę, bo inaczej..." (groźba)',
                nextText: "Walka"
            }
        ]
    },
    {
        id: "Chęć_pomocy",
        text: '"Jestem w stanie zgładzić CEL samodzielnie, będziecie mi tylko wadzić. Nie mogę ryzykować niepowodzenia misji, muszę was zlikwidować!"',
        tlo: 'url("img/Cyborg.png")',
        options: [
            {
                text: 'Rzuć bananem w T-700. (walka)',
                nextText: "Banan"
            },
            {
                text: '"Nie ma takiej potrzeby, nie będę przeszkadzać! (rozmowa)',
                nextText: "Walka"
            }
        ]
    },
    {
        id: "Banan",
        text: 'Rzucasz w przeciwnika bananem, który po prostu odbija się od cyborga.',
        tlo: 'url("img/Cyborg.png")',
        options: [
            {
                text: 'Dobądź broni',
                nextText: "Walka"
            }
        ]
    },
    {
        id: "Walka",
        text: 'Oczy T-700 zaczynają świecić się na czerwono, a z ręki wysuwa mu się ukryte ostrze!',
        tlo: 'url("img/Walka.png")',
        options: [
            {
                text: 'Spróbuj go kopnąć! (walka)',
                nextText: "Walka.1"
            },
            {
                text: 'Uciekaj! (ucieczka)',
                nextText: "Walka.2"
            },
            {
                text: 'Biegnij po banana! (???)',
                nextText: "Walka.3"
            },
            {
                text: 'Schowaj się za biurkiem! (walka)',
                nextText: "Walka.4"
            }
        ]
    },
    {
        id: "Walka.1",
        text: 'Twoja noga łamie się na metalowym szkielecie, a robot zabija Cię jednym ciosem...',
        tlo: 'url("img/Walka.png")',
        options: [
            {
                text: 'Zagraj ponownie',
                nextText: "Start1"
            }
        ]
    },
    {
        id: "Walka.2",
        text: 'Obracasz się, ale jedyne co widzisz po drugiej stronie to wystające z Ciebie ostrze. Nikogo już nie uratujesz...',
        tlo: 'url("img/Walka.png")',
        options: [
            {
                text: 'Zagraj ponownie',
                nextText: "Start1"
            }
        ]
    },
    {
        id: "Walka.3",
        text: 'Oczy robota przestają się świecić na czerwono. Zdziwiony macha ręką i daje Ci szansę uciec, ale z rozpędu zamiast podnieść banana ślizgasz się na skórce i umierasz...',
        tlo: 'url("img/Walka.png")',
        options: [
            {
                text: 'Zagraj ponownie',
                nextText: "Start1"
            }
        ]
    },
    {
        id: "Walka.4",
        text: 'W ostatniej chwili udaje Ci się schować, ale nie ma to większego znaczenia bo robot łamie je jednym uderzeniem, wraz z Tobą...',
        tlo: 'url("img/Walka.png")',
        options: [
            {
                text: 'Zagraj ponownie',
                nextText: "Start1"
            }
        ]
    },
    {
        id: "Koniec_czasu",
        text: 'Cyborg udaje się do sekretariatu, a Wy za nim. Słyszycie odgłosy walki i krzyk bestii. Po chwili niebo zaczyna pękać, a ziemia się trzęsie. Zepsuliście continuum czasoprzestrzenne – świat się kończy, a Wy umrzecie',
        tlo: 'url("img/Koniec_czasu.png")',
        options: [
            {
                text: 'Zagraj ponownie',
                nextText: "Start1"
            }
        ]
    },
    {
        id: "Sukces",
        text: 'Cyborg patrzy tępym wzrokiem na Ciebie przez chwilę, po czym jego oczy stają się zielone i mówi: "Brak danych, poważne ryzyko powodzenia misji, inicjuję powrót." Cyborg wraca do siebie.',
        tlo: 'url("img/Sukces.png")',
        options: [
            {
                text: 'Zagrożenie minęło, a Ty przeżyłeś! Kliknij, aby zagrać ponownie',
                nextText: "Start1"
            }
        ]
    }
]

startGame()