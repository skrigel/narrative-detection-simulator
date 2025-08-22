from operator import ne
import networkx as nx
from faker import Faker
import random
from app.models.simulation_models import SimulationConfig, GraphConfig, DiffusionConfig, SimulationResponse, SimulationStep, SocialEdge, SocialNode


## Workflow: 
# 1. user asks to run simulation
# 2. system builds simulation config
# 3. system creates social graph
# 4. system runs diffusion simulation
# 5. system returns diffusion timeline


## Step 2
def build_simulation_config(
    num_nodes: int = 1000,
    num_clusters: int = 4,
    num_steps: int = 20,
    model: str = "watts_strogatz",
    injection_type: str = "organic",
    rewiring_prob: float = 0.05
) -> SimulationConfig:
    """
    Build the simulation configuration in response to a user's request

    Validates the input parameters and constructs the simulation configuration within a valid range.
    """
    nodes = max(100, min(num_nodes, 2000))
    clusters = max(1, min(num_clusters, 8))
    steps = max(5, min(num_steps, 50))
    rewiring_prob = max(0.1, min(rewiring_prob, 1.0))

    if model not in ["watts_strogatz", "barabasi_albert"]:
        raise ValueError("Invalid model. Use 'watts_strogatz' or 'barabasi_albert'.")

    if injection_type not in ["organic", "influencer"]:
        raise ValueError("Invalid injection_type. Choose from: organic, influencer.")

    graph_config = GraphConfig(
        num_nodes=nodes,
        num_clusters=clusters,
        model=model,
        rewiring_prob=rewiring_prob
    )
    diffusion_config = DiffusionConfig(
        num_steps=steps,
        injection_type=injection_type
    )
    return SimulationConfig(
        graph=graph_config,
        simulation=diffusion_config
    )

## Step 3
def create_social_graph(num_nodes: int, clusters: int, type = "BA") -> nx.Graph:
    """
    Create a social graph using the specified model.

    Args:
        num_nodes (int): The number of nodes in the graph.
        clusters (int): The number of clusters or connections.
        type (str): The type of graph to create ("BA" for Barabási-Albert, "WS" for Watts-Strogatz).

    Returns:
        nx.Graph: The generated social graph.
    """

    num_nodes = min(num_nodes, 1000)
    clusters = min(clusters, 5)

    if type == "barabasi_albert":
        G = nx.barabasi_albert_graph(n=num_nodes, m=clusters, seed=42)
    elif type == "watts_strogatz":
        G = nx.watts_strogatz_graph(n=num_nodes, k=clusters, p=0.5, seed=42)
    else:
        raise ValueError("Unknown graph type")

    faker = Faker()

    for node in G.nodes(data=True):
        node[1]["name"] = faker.name()
        node[1]["ideology"] = random.choice(["left", "right", "centrist"])
        node[1]["engagement"] = random.uniform(0, 1)
        node[1]["active"] = False
        node[1]["activation_step"] = -1
        node[1]["influence"] = random.uniform(0, 1)

    return G


def generate_seed_nodes(graph: nx.Graph, count: int = 3) -> list[int]:
    return random.sample(list(graph.nodes), k=min(count, len(graph.nodes)))

# Step 4: Runs simulation 
def run_diffusion_simulation(graph: nx.Graph, seed_nodes: list[int], max_steps=20) -> list[dict]:
    """
    Simulate narrative spread using a simple influence model.

    Args:
        graph: networkx.Graph with node attributes
        seed_nodes: list of node IDs to start the spread
        max_steps: number of timesteps to simulate

    Returns:
        list[SimulationLog]: The simulation logs for each step.
    """
    step_logs = []

    # Initialize seeds
    for node in seed_nodes:
        graph.nodes[node]["active"] = True
        graph.nodes[node]["activation_step"] = 0

    step_logs.append({
        "step": 0,
        "nodes": seed_nodes,
        "links": []
    })

    # Initial spread targets
    frontier = set(seed_nodes)

    for step in range(1, max_steps + 1):
        new_activations = []
        new_links = []

        for node in frontier:
            for neighbor in graph.neighbors(node):
                if not graph.nodes[neighbor]["active"]:
                    # Basic spread model: 20% chance to activate
                    spread_score = (
                            graph.nodes[node]["influence"] *       # strength of the sender
                            graph.nodes[neighbor]["engagement"]    # willingness of the receiver
                    )

                    threshold = random.uniform(0.2, 0.8)  # adds noise to simulate variability
                    if spread_score > threshold:
                        graph.nodes[neighbor]["active"] = True
                        graph.nodes[neighbor]["activation_step"] = step
                        new_activations.append(neighbor)
                        new_links.append({
                            "source": node,
                            "target": neighbor,
                            "type": "share"
                        })

        # Log the step
        step_logs.append({
            "step": step,
            "nodes": new_activations,
            "links": new_links
        })

        # Prepare for next round
        frontier = new_activations

    return step_logs


def log_diffusion_as_timeline(graph: nx.Graph, step_logs: list[dict]) -> SimulationResponse:
    """
    Construct a stepwise timeline where new nodes and links are added per step.
    Suitable for D3-style progressive network visualization.

    Returns:
        dict with `steps`: list of { step, nodes, links }
    """
    steps = []
    seen_nodes = set()

    for log in step_logs:
        step_nodes = []
        step_links = []

        for node_id in log.get("nodes", []):
            if node_id not in seen_nodes:
                attrs = graph.nodes[node_id]
                step_nodes.append({
                    "id": node_id,
                    "name": attrs.get("name", ""),
                    "ideology": attrs.get("ideology", "centrist"),
                    "influence": attrs.get("influence", 0.0),
                    "engagement": attrs.get("engagement", 0.0),
                    "activation_step": attrs.get("activation_step", -1)
                })
                seen_nodes.add(node_id)

        for edge in log.get("links", []):
            step_links.append({
                "source": edge["source"],
                "target": edge["target"],
                "type": edge["type"]
            })

        steps.append(SimulationStep(
            step=log["step"],
            nodes=[SocialNode(**node) for node in step_nodes],
            links=[SocialEdge(**edge) for edge in step_links]
        ))

    return SimulationResponse(
        steps=steps
    )


# ## Step 5: Constructs temporal log
# def log_diffusion_as_timeline(graph: nx.Graph, step_logs: list[dict]) -> SimulationResponse:
#     """
#     Convert simulation logs into a timeline format for frontend animation.

#     Args:
#         graph (networkx.Graph): The static social graph.
#         step_logs (list[dict]): List of logs per step

#     Returns:
#         dict: Formatted output for D3 temporal force layout.
#     """
#     output = {
#         "nodes": [],
#         "timeline": []
#     }

#     # Prepare static node data
#     for node_id, attrs in graph.nodes(data=True):
#         output["nodes"].append({
#             "id": node_id,
#             "name": attrs.get("name", ""),
#             "ideology": attrs.get("ideology", "centrist"),
#             "influence": attrs.get("influence", 0.0),
#             "engagement": attrs.get("engagement", 0.0),
#             "activation_step": -1  # will be filled in below
#         })

#     # Track activation step
#     activation_map = {}
#     for log in step_logs:
#         for node_id in log.get("activated_nodes", []):
#             activation_map[node_id] = log["step"]

#     # Backfill into nodes
#     for node in output["nodes"]:
#         node["activation_step"] = activation_map.get(node["id"], -1)

#     output["nodes"] = [SocialNode(**node) for node in output["nodes"]]
#     # Add timeline logs
#     for log in step_logs:
#         for edge in log.get("new_links", []):
#             output["timeline"].append(
#                 SocialEdge(
#                     source=edge.source,
#                     target=edge.target,
#                     type=edge.type
#                 )
#             )

#     return output

