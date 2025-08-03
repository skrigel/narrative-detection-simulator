from app.models.schema import DataGenerationRequest, GeneratedRecord
import random

def generate_synthetic_data(payload: DataGenerationRequest):
    fake_data = []

    for _ in range(payload.num_rows):
        record = {}
        for field in payload.data_schema:
            # Basic synthetic data placeholder logic
            if field.type == "string":
                record[field.name] = f"fake_{field.name}"
            elif field.type == "int":
                record[field.name] = str(random.randint(0, 100))
            else:
                record[field.name] = "N/A"
        fake_data.append(GeneratedRecord(data=record))

    return fake_data
