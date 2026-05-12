import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Upload from "./pages/Upload";
import Processing from "./pages/Processing";
import ExtractionSuccess from "./pages/ExtractionSuccess";
import VisualIntelligence from "./pages/VisualIntelligence";
import Validation from "./pages/Validation";
import Enrichment from "./pages/Enrichment";
import Export from "./pages/Export";
import ExportSuccess from "./pages/ExportSuccess";
import Analytics from "./pages/Analytics";
import AssetManager from "./pages/AssetManager";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Upload} />
      <Route path="/processing" component={Processing} />
      <Route path="/extraction-success" component={ExtractionSuccess} />
      <Route path="/visual-intelligence" component={VisualIntelligence} />
      <Route path="/validation" component={Validation} />
      <Route path="/enrichment" component={Enrichment} />
      <Route path="/export" component={Export} />
      <Route path="/export-success" component={ExportSuccess} />
      <Route path="/analytics" component={Analytics} />
      <Route path="/asset-manager" component={AssetManager} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
