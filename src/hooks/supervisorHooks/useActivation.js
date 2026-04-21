import usePatch from "../generalHooks/usePatch";


export default function useActivation() {
 return usePatch( `/Supervisor/ReportQuestions` );

}

