import React, { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet";
import PropTypes from "prop-types";

/**
 * Pyodide component
 *
 * @param {object} props - react props
 * @param {string} props.pythonCode - python code to run
 * @param {string} [props.loadingMessage] - loading message
 * @param {string} [props.evaluatingMessage] - evaluating message
 * @returns {object} - pyodide node displaying result of python code
 */
function Pyodide({
  pythonCode,
  loadingMessage = "loading…",
  evaluatingMessage = "evaluating…",
}) {
  const indexURL = "https://cdn.jsdelivr.net/pyodide/v0.21.2/full/";
  const pyodide = useRef(null);
  const [isPyodideLoading, setIsPyodideLoading] = useState(true);
  const [pyodideOutput, setPyodideOutput] = useState(evaluatingMessage); // load pyodide wasm module and initialize it

  console.log("running use effects now...");

  useEffect(() => {
    setTimeout(()=>{
      (async function () {
        pyodide.current = await globalThis.loadPyodide({ indexURL });
        setIsPyodideLoading(false);
      })();
    }, 1000)
  }, [pyodide]); // evaluate python code with pyodide and set output

  useEffect(() => {
    if (!isPyodideLoading) {
      const evaluatePython = async (pyodide, pythonCode) => {
        try {
          await pyodide.loadPackage("micropip");
          const micropip = pyodide.pyimport("micropip");
          await micropip.install("panel");
          return await pyodide.runPython(pythonCode);
        } catch (error) {
          console.error(error);
          return "Error evaluating Python code. See console for details.";
        }
      };
      (async function () {
        setPyodideOutput(await evaluatePython(pyodide.current, pythonCode));
      })();
    }
  }, [isPyodideLoading, pyodide, pythonCode]);

  console.log("output: ", pyodideOutput);

  return (
    <>
      <Helmet>
        <script 
          src={`${indexURL}pyodide.js`}
        />
        <script
          type="text/javascript"
          src="https://cdn.bokeh.org/bokeh/release/bokeh-2.4.3.js"
        />
        <script
          type="text/javascript"
          src="https://cdn.bokeh.org/bokeh/release/bokeh-widgets-2.4.3.min.js"
        />
        <script
          type="text/javascript"
          src="https://cdn.bokeh.org/bokeh/release/bokeh-tables-2.4.3.min.js"
        />
        <script
          type="text/javascript"
          src="https://cdn.jsdelivr.net/npm/@holoviz/panel@0.14.0/dist/panel.min.js"
        />
      </Helmet>
      <div>
        Pyodide Output: {isPyodideLoading ? loadingMessage : pyodideOutput}
      </div>
    </>
  );
}

Pyodide.propTypes = {
  pythonCode: PropTypes.string.isRequired,
  loadingMessage: PropTypes.string,
  evaluatingMessage: PropTypes.string
};

export default Pyodide;
