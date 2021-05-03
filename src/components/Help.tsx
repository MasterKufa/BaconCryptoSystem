import React, { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { openAlert, openHelp } from "../redux/actions"
import { State } from "../redux/reducer"
import "./Help.scss"
import Cr1 from "../assets/CryptoButton.jpg"
import Cr2 from "../assets/StenoButton.jpg"
import Cr3 from "../assets/cr3.jpg"
import Cr4 from "../assets/cr4.jpg"
import Cr5 from "../assets/edit64.png"
import Cr6 from "../assets/cr6.jpg"
import Cr7 from "../assets/check.png"
import Cr8 from "../assets/cr8.jpg"
import Cr9 from "../assets/cr9.jpg"
import Cr10 from "../assets/cr10.jpg"
import Cr11 from "../assets/cr11.jpg"
import Cr12 from "../assets/cr12.jpg"
import Cr13 from "../assets/cr13.jpg"
import Cr14 from "../assets/cr14.jpg"
import Cr15 from "../assets/cr15.jpg"

const Image = ({ src, label }: { src: string; label: string }) => (
  <div className="ImageContainer">
    <img className="Image" src={src} />
    <div className="Label">{label}</div>
  </div>
)

export const Help = () => {
  const { isHelpOpened } = useSelector<State, State>((st) => st)
  const dispatch = useDispatch()
  return (
    <>
      {isHelpOpened && (
        <div className="BackDrop">
          <div className="helpContainer">
            <div className="helpHeader">Справка</div>

            <div className={"HelpNote"}>
              <div>
                &ensp;&ensp;&ensp;Программа реализует шифрование с помощью алгоритма Фрэнсиса Бэкона в двух режимах{" "}
                <span className={"red"}>"Криптографическом" и "Стенографическом"</span>.
              </div>
              <div>
                &ensp;&ensp;&ensp;Переключение между режимами происходит посредством нажатия на соответствующие кнопки
                (рис. 1-2), активный режим выделен более ярким цветом.
              </div>
              <div className="insert">
                <Image src={Cr1} label="Рис. 1" />
                <Image src={Cr2} label="Рис. 2" />
              </div>
              <div>
                &ensp;&ensp;&ensp;Шифрование осуществляется по таблице (рис. 3 для криптографии, рис.4 для стенографии)
                <div className="insert">
                  <Image src={Cr3} label="Рис. 3" />
                  <Image src={Cr4} label="Рис. 4" />
                </div>
              </div>
              <div>
                <div>
                  &ensp;&ensp;&ensp;<span className={"red"}>Криптографический</span> режим осуществляет шифрование в два
                  этапа:
                </div>
                - буквы заданного сообщения шифруются двухлитерным кодом согласно столбцу{" "}
                <span className="red">"Код"</span> <br />- литеры a и b случайным образом переходят к начальному
                алфавиту согласно столбцу <span className="red">"К1" или "К2"</span> в зависимости от выбранных
                параметров
              </div>
              <br />
              <div>
                &ensp;&ensp;&ensp;Кнопка <span className="red">"Ген. Коды"</span> случайным образом перегенерирует
                шестизначный двухлитерный код в колонке <span className="red">"Код"</span>
              </div>
              <div>
                &ensp;&ensp;&ensp;Кнопка <span className="red">"Ген. K1"</span> случайным образом перегенерирует
                двухлитерный код в колонке <span className="red">"K1"</span>
              </div>
              <div>
                &ensp;&ensp;&ensp;Кнопка <span className="red">"Англ. &lt;-=-&gt; Рус."</span> переключает алфавит для
                <span className="red"> Стенографического</span> режима в колонке <span className="red">"Символ"</span>
              </div>
              <br />
              <div>
                &ensp;&ensp;&ensp;<span className="red">Иконка Ручки</span> (рис. 5) включает режим редактирования для
                соответствующего поля, при наличии <span className="red">ошибки</span> границы поля редактирования
                становятся <span className="red">красными</span> (рис. 6), подтверждение при корректном вводе
                осуществляется нажатием на <span className="red">галочку</span> (рис. 7) или клавишу Enter
              </div>
              <div className="insert">
                <Image src={Cr5} label="Рис. 5" />
                <Image src={Cr6} label="Рис. 6" />
                <Image src={Cr7} label="Рис. 7" />
              </div>
              <div>
                &ensp;&ensp;&ensp;<span className={"red"}>Правила валидации:</span>
              </div>
              <div>- ввод состоит только из литер a и/или b </div>
              <div>- 6 символов для колонки "Код", 1 символ для ключей К1 и К2</div>
              <div>
                <br />
                &ensp;&ensp;&ensp; В правой части находится <span className="red">окно параметров</span> для
                (Де)Шифрования (рис.8).{" "}
                <div className="insert">
                  <Image src={Cr8} label="Рис. 8" />
                </div>
                <span className="red">&ensp;&ensp;&ensp;Текущий режим Шифрование/Расшифрование</span> более яркий, для
                переключения нажать на темную область другого режима
                <div>
                  <br />
                  &ensp;&ensp;&ensp;При вводе в поля "Исходное сообщение" производятся{" "}
                  <span className="red">проверки</span>
                  <br />
                  - на пустоту
                  <br />- на корректность введенных символов (только английские буквы без посторонних символов) <br />
                  <br />
                  &ensp;&ensp;&ensp;При некорректном вводе поле станет <span className="red">красным</span> , а кнопка
                  снизу <span className="red">неактивной</span>
                  <br />
                  <br />
                  &ensp;&ensp;&ensp;При <span className="red">расшифровании</span> есть возможность выбрать ключ для
                  расшифровки, поставив галочку напротив <span className="red">К1 или К2</span>
                  <br />
                  <br />
                </div>
                <div>
                  &ensp;&ensp;&ensp;Возможен <span className="red">подбор ключа под ложное сообщение</span>, для этого
                  требуется ввести сообщение в соответствующее поле и нажать рядом кнопку
                  <span className="red"> "К2?"</span>, соответствующий ключ перегенерируется. <br />
                  &ensp;&ensp;&ensp;Подбор ложного сообщения в стено режиме не всегда возможен полностью, так как одна
                  буква в рамках текущих буквенных кодов может являться и a, и b, меняя только столбец K2 полное
                  совпадение <span className="red">не гарантируется</span>
                </div>
                <br />
                <div>
                  <div>
                    &ensp;&ensp;&ensp;<span className={"red"}>Стенографический</span> режим осуществляет шифрование в
                    два этапа:
                  </div>
                  - буквы заданного сообщения шифруются двухлитерным кодом согласно столбцу{" "}
                  <span className="red">"Код"</span>
                  <br />- литеры a и b ставятся в соответствие один к одному тексту-контейнеру, начиная с первого
                  символа, к каждой букве <span className="red">применяется выбранная трансформация</span>, позволяющая
                  отличить a от b
                </div>
                <div className="insert">
                  <Image src={Cr9} label="Рис. 9" />
                </div>
                <div>
                  &ensp;&ensp;&ensp;<span className={"red"}>Виды трансформаций:</span>
                </div>
                <div>- Загл./строч. буквы </div>
                <div>- Красный/Черный цвет</div>
                <div>- TNR/Arial</div>
                <div>- Прямой/Курсив</div>
                <div>
                  <br />
                  &ensp;&ensp;&ensp;При вводе в полy "Текст-контейнер" производятся
                  <span className="red"> проверки</span>
                  <br />
                  - на пустоту
                  <br />- на корректность введенных символов (только буквы из колонки{" "}
                  <span className="red">"Символ"</span> таблицы слева без посторонних символов)
                  <br />- длина контейнера не менее количества букв в исходном сообщении, умноженное на 6
                  <br />
                  <br />
                  &ensp;&ensp;&ensp;При некорректном вводе поле станет <span className="red">красным</span> , а кнопка
                  снизу <span className="red">неактивной</span>. Также кнопка снизу станет{" "}
                  <span className="red">неактивной</span>, если в криптотаблице есть одинаковые коды в графе{" "}
                  <span className="red">"Символ"</span>
                </div>
                <br />
                <div>
                  &ensp;&ensp;&ensp;В <span className="red">центральной</span> части находится окно с{" "}
                  <span className="red">результатами</span> шифрования/дешифрования (по шагам) согласно
                  криптографической таблице
                </div>
                <div className="insert">
                  <Image src={Cr10} label="Рис. 10" />
                  <Image src={Cr11} label="Рис. 11" />
                  <Image src={Cr12} label="Рис. 12" />
                </div>
                <div>
                  &ensp;&ensp;&ensp;<span className="red">Справку</span> всегда можно посмотреть, нажав на вопросик в
                  нижней части экрана
                </div>
                <div className="insert">
                  <Image src={Cr13} label="Рис. 13" />
                </div>
              </div>
            </div>

            <div onClick={() => dispatch(openHelp(false))} className="closeCross" />
          </div>
        </div>
      )}
    </>
  )
}
export const Alert = () => {
  const { isAlertOpened } = useSelector<State, State>((st) => st)
  const dispatch = useDispatch()
  return (
    <>
      {isAlertOpened && (
        <div className="BackDrop">
          <div className="helpContainer">
            <div className="helpHeader">Внимание!!!! Установи масштаб 66%!!! </div>
            <div className={"HelpNote"}>
              &ensp;&ensp;&ensp;Если у вас <span className="red">проблемы с масштабом</span> и все выглядит не так, как
              на картинках ниже, поменяйте масштаб страницы браузера клавишами{" "}
              <span className="red">crtl- или ctrl+</span> (сmd- или cmd+)
              <br />
              <br />
              <div className="insert">
                <Image src={Cr14} label="..." />
                <Image src={Cr15} label="..." />
              </div>
              <br />
              &ensp;&ensp;&ensp;Чаще всего <span className="red">корретное отображение</span> достигается на стандартных
              экранах компьютеров при масштабах <span className="red">66% или 100%</span>
              <div onClick={() => dispatch(openAlert(false))} className="closeCross" />
            </div>
          </div>
        </div>
      )}
    </>
  )
}
