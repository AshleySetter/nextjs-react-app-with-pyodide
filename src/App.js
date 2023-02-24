import Pyodide from "./pyodide";
import "./styles.css";

let myPythonCodeString = `
import panel as pn

pn.extension(sizing_mode="stretch_width")

slider = pn.widgets.FloatSlider(start=0, end=10, name='Amplitude')

def callback(new):
    return f'Amplitude is: {new}'

pn.Row(slider, pn.bind(callback, slider)).servable(target='simple_app')
`;

myPythonCodeString = `
1+9
`;

export default function App() {
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <Pyodide pythonCode={myPythonCodeString} />
    </div>
  );
}
