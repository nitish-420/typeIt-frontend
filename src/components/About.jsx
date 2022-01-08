import React from 'react'

const About = () => {
    return (
        <div className="aboutBox container text-white bg-dark">
            <div className="accordion accordion-flush p-3 text-white bg-dark" id="accordionFlushExample">
                <div className="accordion-item text-white bg-dark">
                    <h2 className="accordion-header" id="flush-headingOne">
                        <button className="accordion-button collapsed text-white bg-dark" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                            About the App
                        </button>
                    </h2>
                    <div id="flush-collapseOne" className="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                        <div className="accordion-body">
                            Typeit is a simple and a helpful typing test website build around the concept of testing user's typing speed. It currently consists of typing tests of various time category in English, C, Python, JAVA and JavaScript. It also has an account system to save and view user's typing test history and a Leaderboard to see the overall best results in each category. It is a very helpful website to improve a programmer's typing speed in various languages including the native language-English.
                            With some unique features -
                            <ul>
                            <p></p>
                                <li>RESULTS SCREEN
                                    <p></p>
                                    After completing a test you will be able to see your wpm, raw wpm, accuracy, character stats, test length, leaderboards info and test info. 
                                    (you can hover over some values to get floating point numbers). You can also see a graph of your wpm and raw over the duration of the test.
                                     Remember that the wpm line is a global average, while the raw wpm line is a local, momentary value. (meaning if you stop, the value is 0)
                                    
                                </li>
                                <li>
                                <p></p>STATS
                                    <p></p><p></p>
                                     wpm - total amount of characters in the correctly typed words (including spaces), divided by 5 and normalised to 60 seconds.

                                        <p></p>raw wpm - calculated just like wpm, but also includes incorrect words.

                                        <p></p>acc - percentage of correctly pressed keys.

                                        <p></p> char - correct characters / incorrect characters. Calculated after the test has ended.

                                        <p></p>consistency - based on the variance of your raw wpm. Closer to 100% is better. Calculated using the coefficient of variation of raw wpm and mapped onto a scale from 0 to 100.
                                    
                                </li>
                                
                            </ul>

                        </div>
                    </div>
                </div>
                <div className="accordion-item text-white bg-dark">
                    <h2 className="accordion-header " id="flush-headingTwo">
                        <button className="accordion-button collapsed text-white bg-dark " type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
                            How to use the App
                        </button>
                    </h2>
                    <div id="flush-collapseTwo" className="accordion-collapse collapse" aria-labelledby="flush-headingTwo" data-bs-parent="#accordionFlushExample">
                        <div className="accordion-body">
                        <ul>
                                <li>Keybinds</li>
                                    You can use TAB to restart the typing test.
                                <li>For English</li>
                                Press spaces after each word. If the sentence is long press space after the last word you see on screen and the app will centre the rest of it accordingly.
                                <li>For other languages</li>
                                Press spaces after each word. If the sentence is long press space after the last word you see on screen and the app will centre the rest of it accordingly.
                                <br></br>Press ENTER after every line to go to the next
                                
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="accordion-item text-white bg-dark">
                    <h2 className="accordion-header" id="flush-headingThree">
                        <button className="accordion-button collapsed text-white bg-dark" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
                            Future insights
                        </button>
                    </h2>
                    <div id="flush-collapseThree" className="accordion-collapse collapse" aria-labelledby="flush-headingThree" data-bs-parent="#accordionFlushExample">
                        <div className="accordion-body">
                            <ul>
                                <li>Typing Race!</li>
                                <p></p>Allowing users to have a typing race among themeselves by random, friend or intra-group options to choose from. <p></p>
                                <li>Discord server</li>
                                <p></p>Opening discord server to communicate to the users for future races and contests! <p></p>
 
                            </ul>
                            Contact me in case of any query, or any suggestion of new feature
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default About