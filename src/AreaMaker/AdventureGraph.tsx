import { useEffect } from "react";
import { useLoadGraph, useSigma } from "@react-sigma/core";
import { useLayoutCircular } from "@react-sigma/layout-circular";
import { SerializedGraph } from "graphology-types";
import { DirectedGraph } from "graphology";

import { convertAreasToEdges, convertAreasToNodes } from "./domain/graphUtil";
import { Area } from "./domain/types";

type Props = {
    areas: Array<Area>;
    onAreaClick: (clickedArea: string) => void;
};

export const AdventureGraph = (props: Props) => {
    const { areas, onAreaClick } = props;
    const { assign } = useLayoutCircular();
    const loadgraph = useLoadGraph();

    useEffect(() => {
        const serializedGraph: SerializedGraph = {
            attributes: { name: 'Adventure' },
            options: {
                allowSelfLoops: true,
                multi: false,
                type: 'directed'
            },
            nodes: convertAreasToNodes(areas),
            edges: convertAreasToEdges(areas)
        };
        const graph = DirectedGraph.from(serializedGraph);

        loadgraph(graph);
        assign();
    }, [loadgraph, areas]);

    const sigma = useSigma();

    sigma.setSetting('labelColor', { color: '#FCFEFF' });

    sigma.removeAllListeners();
    sigma.addListener("clickNode", (sigmaEventPayload) => {
        sigmaEventPayload.preventSigmaDefault();
        onAreaClick(sigmaEventPayload.node);
    });

    return null;
};
