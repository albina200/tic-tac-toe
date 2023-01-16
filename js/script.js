let cells = document.querySelectorAll('.cell'); //все ячейки
let simvolSpan = document.querySelector('span'); //спан в котором отображается кто ходит
let simvol = 'x';
let moveNumber = 0; //переменна якоторая считает сколько ходов уже сделано
let winner = false; // победитель есть - true или нет - false
let botMove = true; //Переменная которая показывает походил ли бот. Если true то бот походил.
let combinations = [ //масив с комбинациями на победу
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]
for (let i = 0; i < 9; i++) { //Цикл 9 раз
    cells[i].onclick = function () { // Функция при нажатии на любую ячейку
        if (cells[i].innerHTML == '' && botMove == true) { //Если ячейка на которую нажали пустая и бот походил
            cells[i].innerHTML = 'X'; //Вписываем в ячку X
            botMove = false; //Включаем бота, он начинает думать
            moveNumber++; //Увеличиваем ход на один
            simvolSpan.innerHTML = '0';//Помещаем нолик в спан, кто ходит следующий
            chekWinner(); //Вызывем функцию проверки
            if (winner == false && moveNumber < 9) { //Если победителя нет и кол-во ходов меньше 9
                setTimeout(() => { //Ждём пол секунды

                    for (let i = 0; i < 8; i++){ //Цикл ищет выйграшную комбинацию
                        if (botMove == false) { //Если бот ещё не походил
                            let [a, b, c] = combinations[i]; //Переменная i
                            switch (true) { //Сравнивает выражение (true) со случаями (кейс), перечисленными внутри неё, а затем выполняет соответствующие инструкции

                                case cells[a].innerHTML == '' && cells[b].innerHTML == '0' && cells[c].innerHTML == '0': { //(cells[a].innerHTML == '' && cells[b].innerHTML == '0' && cells[c].innerHTML == '0') = true
                                    cells[a].innerHTML = '0'; //Бот заполняет пустую ячейку
                                    botMove = true; //Бот перестаёт ходить
                                    break; //Перестанет проверять
                                }
                                case cells[a].innerHTML == '0' && cells[b].innerHTML == '' && cells[c].innerHTML == '0': {
                                    cells[b].innerHTML = '0';
                                    botMove = true;
                                    break;
                                }
                                case cells[a].innerHTML == '0' && cells[b].innerHTML == '0' && cells[c].innerHTML == '': { //
                                    cells[c].innerHTML = '0';
                                    botMove = true;
                                    break;
                                }
                            }
                        }
                    }

                    for (let i = 0; i < 8; i++) { //Цикл ищет, как помешать выйграть
                        if (botMove == false) {
                            let [a, b, c] = combinations[i];
                            switch (true) {
                                case cells[a].innerHTML == 'X' && cells[b].innerHTML == 'X' && cells[c].innerHTML == '': {
                                    cells[c].innerHTML = '0';
                                    botMove = true;
                                    break;
                                }
                                case cells[a].innerHTML == '' && cells[b].innerHTML == 'X' && cells[c].innerHTML == 'X': {
                                    cells[a].innerHTML = '0';
                                    botMove = true;
                                    break;
                                }
                                case cells[a].innerHTML == 'X' && cells[b].innerHTML == '' && cells[c].innerHTML == 'X': {
                                    cells[b].innerHTML = '0';
                                    botMove = true;
                                    break;
                                }
                            }
                        }
                    }

                    while (botMove == false) { //Повторять, пока бот думает
                        let randomNumber = Math.floor(Math.random() * (8 - 0 + 1) + 0); // Переменная в которую попало случайное число от нуля до восьми
                        if (cells[randomNumber].innerHTML == '') { //Если ячейка, которую выбрал бот пустая
                            cells[randomNumber].innerHTML = '0'; // Тогда в ячейку ставим 0
                            botMove = true; //Бот перестаёт думать
                        }
                    }
                    moveNumber++;
                    chekWinner()
                    simvolSpan.innerHTML = 'x';   
                }, 1000);
            }
        } else { //Иначе, если нажали на занятую ячейку
            cells[i].classList.add('error'); //Добавляем класс для этой ячейки
            setTimeout(() => { //Ждём пол секунды
                cells[i].classList.remove('error');//Удаляем класс у этой ячейки
            }, 500);
        }
    }
}
function reset() { //Функция обнуления клеток  всего остольного
    for (let i = 0; i < 9; i++) {
        cells[i].innerHTML = ''; //Удаляем символ в клетке
    }
    moveNumber = 0; //Обнуляем кол-во ходов
    winner = false; //Обнуляем предыдущую победу
    simvolSpan.innerHTML = 'x';
    botMove = true;
}

function chekWinner() {
    for (let i = 0; i < 8; i++) { //Цикл 8 раз
        let oneComb = combinations[i];//В эту переменнну попадают поочереди все комбинации
        let [a, b, c] = oneComb;//Массив в который попадает числа из комбинации
        if (cells[a].innerHTML != '') {//Если первая ячейка из комбинации НЕ пустая
            if (cells[a].innerHTML == cells[b].innerHTML && cells[a].innerHTML == cells[c].innerHTML && winner == false) {//Если первая ячейка равно второй и если первая ячейка равна третьей и если победителей нет
                winner = true; //Меняем переменную, победитель есть
                setTimeout(() => { //Функция ждать 0,3 секунды
                    alert('Победил  ' + cells[a].innerHTML);
                    reset();
                }, 300);
            }
        }
    }
    if (moveNumber == 9 && winner == false) { //Если колличество ходов 9 и победителя нет
        setTimeout(() => { //Ждём 0.3 секунды
            alert('Ничья')
            reset();
        }, 300);
    }
}