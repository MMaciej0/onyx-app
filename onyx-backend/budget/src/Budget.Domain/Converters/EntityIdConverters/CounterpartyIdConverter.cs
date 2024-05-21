﻿using Budget.Domain.Counterparties;
using Newtonsoft.Json;

namespace Budget.Domain.Converters.EntityIdConverters;

public class CounterpartyIdConverter : JsonConverter
{
    public override void WriteJson(JsonWriter writer, object value, JsonSerializer serializer)
    {
        var id = (CounterpartyId)value;
        serializer.Serialize(writer, id.Value.ToString());
    }

    public override object? ReadJson(JsonReader reader, Type objectType, object existingValue, JsonSerializer serializer)
    {
        var guid = serializer.Deserialize<string>(reader);

        return guid is null ? null : new CounterpartyId(guid);
    }

    public override bool CanConvert(Type objectType)
    {
        return objectType == typeof(CounterpartyId);
    }
}