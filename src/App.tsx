import './App.css'
import {tableOfContentsItems} from "./components/TableOfContents/data/tableOfContentsItems.ts";
import {useTableOfContents} from "./components/TableOfContents/useTableOfContents.ts";
import {TableOfContents} from "./components/TableOfContents/TableOfContents.tsx";

function App() {
    const items = tableOfContentsItems;
    const props = useTableOfContents({ items });

    return (
        <div>
            <TableOfContents {...props} />
        </div>
    );
}

export default App
