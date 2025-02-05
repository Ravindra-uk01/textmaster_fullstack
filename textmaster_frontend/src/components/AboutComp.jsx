import { useSelector } from "react-redux";
import "../styles/aboutComp.css";

export default function AboutComp() {
  const { color, backgroundColor } = useSelector((state) => state.theme);

  // console.log('color is ', color)
  // console.log('backgroundColor is ', backgroundColor)

  return (
    <div className="aboutComp_mainDiv">
      <div className="aboutComp_Div">
        <div className="aboutComp_Head">
          <h2 className="my-3">About Us</h2>
          <p>
            {/* <b>TextMaster</b> is a ReactJs website built primarily to do various
            operations on regular typed text. You can safely use WordPad or
            NotePad for text drafting, and saving, but <i>TextMaster</i> offers
            much more than simple text drafting and formatting. TextMaster can
            convert your text to any case in just one simple click of a button.
            It can extract links and numbers safely from a labyrinth of random
            text or sophisticated documentation. It has an improved property of
            base64 encoding, reversal of your inputted text.You can even remove
            whitespaces from your scripted documents, and wear up your earphones
            to listen to it, instead of straining your eyes! It does a detailed
            analyzing of your text, and provides an output of words, and
            characters, along with reading time as well. The best part of{" "}
            <i>TextMaster</i> is that it is an open source project, as a result,
            dozens of new features are in the upcoming, which definitely makes
            it a cut above the rest. <br /> */}
            <b>TextMaster</b> is a ReactJS website built primarily to perform
            various operations on regularly typed text. While you can safely use
            WordPad or Notepad for text drafting and saving, <i> TextMaster</i>{" "}
            offers much more than simple text drafting and formatting. <br />
            TextMaster can convert your text to any case with just one simple
            click of a button. It can extract links and numbers safely from a
            labyrinth of random text or sophisticated documentation. The
            application boasts an improved property of base64 encoding and
            allows you to reverse your inputted text. You can even remove
            whitespaces from your scripted documents and listen to your text
            using the text-to-speech feature, instead of straining your eyes!.{" "}
            <br />
            Additionally, <i> TextMaster</i> provides detailed analysis of your
            text, outputting the number of words and characters along with
            estimated reading time.
            <br /> <br />
            <b>New Features</b> <br />
            <ol>
              <li>
                <b>User Authentication:</b> Users can log in, log out, and manage their
                accounts with options for password recovery and reset.
              </li>
              <li>
                <b>Document Management:</b> Save documents for later retrieval,
                ensuring easy access to important files.
              </li>
              <li>
                <b>Bookmarking:</b> Users can bookmark important components for quick
                reference.
              </li>
              <li>
                <b>Theme Support:</b> Switch between light mode and dark mode for a
                personalized user experience.
              </li>
              <li>
                <b>Multilingual Support:</b> View content in multiple languages to
                enhance accessibility.
              </li>
              <li>
                <b>Responsive Design:</b> The application is fully responsive and
                accessible on any device format.
              </li>
            </ol>
            The most eminent features of the website are as follows :
          </p>
        </div>
        <div className="accordion" id="accordionExample">
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingOne">
              <button
                className="accordion-button"
                type="button"
                // style={myStyle}
                data-bs-toggle="collapse"
                data-bs-target="#collapseOne"
                aria-expanded="true"
                aria-controls="collapseOne"
              >
                <strong>Analyze Your Text</strong>
              </button>
            </h2>
            <div
              id="collapseOne"
              className="accordion-collapse collapse show"
              aria-labelledby="headingOne"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body">
                It is a <i>Simple Text Analyzer</i> , which mutilates your text,
                but in a tender way
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingTwo">
              <button
                className="accordion-button collapsed"
                type="button"
                // style={myStyle}
                data-bs-toggle="collapse"
                data-bs-target="#collapseTwo"
                aria-expanded="false"
                aria-controls="collapseTwo"
              >
                <strong>Free to use</strong>
              </button>
            </h2>
            <div
              id="collapseTwo"
              className="accordion-collapse collapse"
              aria-labelledby="headingTwo"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body">
                It is completely <i>free</i> to use. No credit cards required.
                Use as much as you want!!
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingThree">
              <button
                className="accordion-button collapsed"
                type="button"
                // style={myStyle}
                data-bs-toggle="collapse"
                data-bs-target="#collapseThree"
                aria-expanded="false"
                aria-controls="collapseThree"
              >
                <strong>Browser Compatible</strong>
              </button>
            </h2>
            <div
              id="collapseThree"
              className="accordion-collapse collapse"
              aria-labelledby="headingThree"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body">
                It is compatible with all of your <i>favorite</i> browsers.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
