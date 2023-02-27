import Pyodide from "./pyodide";
import "./styles.css";

let myPythonCodeString = `
import panel as pn
pn.extension(sizing_mode="stretch_width")

slider = pn.widgets.FloatSlider(start=0, end=10, name='Amplitude')

def callback(new):
    return f'Amplitude is: {new}'

component = pn.Row(slider, pn.bind(callback, slider))
component.servable(target='my_panel_widget');
`;

export default function App() {
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <Pyodide pythonCode={myPythonCodeString} />
      <div id="my_panel_widget"></div>
    </div>
  );
}
