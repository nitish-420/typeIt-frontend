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
                            <p>
                                Typeit is a simple and a helpful typing test website build around the concept of testing user's typing speed. It currently consists of typing tests of various time category in English, Python, C, JAVA and JavaScript. It also has an account system to save and view user's typing test history and a Leaderboard to see the overall best results in each category. It is a very helpful website to improve a programmer's typing speed in various languages including the native language-English.
                            </p>
                            <ul>
                                <li>
                                    <h5>TEST SCREEN</h5>
                                    <p>
                                        In test screen there are options to choose language and time which you want to choose and as you type a single character from keyboard test will start and focus mode will be turned on and now you will be able to see only words to type, your cursor, live wpm speed, live accuracy, live timer and restart button only. 
                                    </p>
                                </li>
                                <li>
                                    <h5>RESULTS SCREEN</h5>
                                    <p>
                                        After completing a test you will be able to see your test info. 
                                    </p>
                                </li>
                                <li>
                                    <h5>DATA USED</h5>
                                    <p>
                                        We have tried our best to give our users knowlege also, like in programming languages we have used many one liners code that will help them to learn many new short syntax and enjoy as well.
                                    </p>
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
                                    <p>You can use TAB to focus on the restart button and you can press enter any time to restart the test.</p>
                                    <p>You can use BACKSPACE to get back on current word or the previous word (if it was wrong).</p>
                                <li>For English</li>
                                    <p>
                                        Press SPACE after each word to jump on the next word.
                                    </p>
                                <li>For other languages</li>
                                    <p>
                                        Press SPACE after each word to jump on the next word.
                                        <br/>
                                        Press ENTER at the end of line to go to the next line. In case you lost the cursor due to small screen size press SPACE it will take you to next word with focused cursor.

                                    </p>
                                
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
                                <p>Allowing users to have a typing race among themeselves by random, friend or intra-group options to choose from. </p>
                                <li>Discord server</li>
                                <p>Opening discord server to communicate to the users for future races and contests! </p>
 
                            </ul>
                            Contact us in case of any query, or any suggestion of new feature.
                            For code visit our github repository link in the footer.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default About