from fastapi import APIRouter
from app.models.simulation_models import SimulationRequest, SimulationResponse
from app.services.simulation_service import build_simulation_config, create_social_graph, run_diffusion_simulation, generate_seed_nodes, log_diffusion_as_timeline

router = APIRouter()

@router.post("/simulation/generate", response_model=SimulationResponse)
def generate_narratives(payload: SimulationRequest):

    simulation_config = build_simulation_config(payload.num_nodes, payload.clusters, payload.steps,
                                                payload.model, payload.injection_type, payload.rewiring_prob)
    
    print("Creating graph")
    graph = create_social_graph(simulation_config.graph.num_nodes, simulation_config.graph.num_clusters,
                                 simulation_config.graph.model)
    
    print("Generating seed nodes")
    seeds = generate_seed_nodes(graph, count=3)

    print("Running simulation")
    simulation_results = run_diffusion_simulation(graph, seeds, payload.steps)

    print("Logging timeline")
    timeline = log_diffusion_as_timeline(graph, simulation_results)

    return timeline