import Pyodide from "../pyodide";

const myPythonWidget = `
from js import window
import panel as pn
pn.extension(sizing_mode="stretch_width")

slider = pn.widgets.FloatSlider(start=0, end=10, name='Amplitude')

def callback(new):
    return f'Amplitude is: {new}'

component = pn.Row(slider, pn.bind(callback, slider))
component.servable(target='my_panel_widget');
`;

const myPythonAsyncApiRequest = `
import asyncio
# from js import window
from js import fetch

async def main():
  async def get_data():
    res = await fetch('/users', 
      method = 'GET',
      # headers = {
      #   'Cookie': '_vsid=e42b01e4-6e0f-4bc6-8cae-c7202c005ca1',
      # },
    )
    print("response", res)
    data = res
    data = await res.text()
    print("data", data)
    return data

  data = await get_data()
  print(data)
  print("Main loop done")
  return data

main
`;


export default function App() {
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <Pyodide pythonCode={myPythonWidget} />
      <div id="my_panel_widget"></div>
      <Pyodide pythonCode={myPythonAsyncApiRequest} />
    </div>
  );
}
