import './App.css';
// import { tableOfContentsItems } from "./components/TableOfContents/data/tableOfContentsItems";
import { useTableOfContents } from "./components/TableOfContents/useTableOfContents";
import { TableOfContents } from "./components/TableOfContents/TableOfContents";
import { NOZ_TOC_ITEMS_MOCK } from './components/TableOfContents/data/NOZ_TOC_ITEMS_MOCK.ts';
import { useMemo } from 'react';

function App() {

    // Items are loaded just once - when initial render is done - USE MEMO
    function loadItems() {
        console.log("initial Render")
        return NOZ_TOC_ITEMS_MOCK
    }
    const items = useMemo(() => loadItems(), []);

    const props = useTableOfContents({ items });
    console.log(props)

    return (
        <div>
            <TableOfContents {...props} />
        </div>
    );
}

export default App;

