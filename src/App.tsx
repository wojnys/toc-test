import './App.css';
// import { tableOfContentsItems } from "./components/TableOfContents/data/tableOfContentsItems";
import { useTableOfContents } from "./components/TableOfContents/useTableOfContents";
import { TableOfContents } from "./components/TableOfContents/TableOfContents";
import { NOZ_TOC_ITEMS_MOCK } from './components/TableOfContents/data/NOZ_TOC_ITEMS_MOCK.ts';

function App() {
    const items = NOZ_TOC_ITEMS_MOCK;
    const props = useTableOfContents({ items });
    console.log(props)

    return (
        <div>
            <TableOfContents {...props} />
        </div>
    );
}

export default App;

