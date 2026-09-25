export function FinanceCard({ card }) {

  try {
    return (
      <View>
        <Text>{card.getIcon()}</Text>

        <Text>{card.title}</Text>

        <Text>
          {card.getFormattedValue()}
        </Text>
      </View>
    );

  } catch (error) {
    return (
      <View>
        <Text>Erro ao carregar cartão.</Text>
      </View>
    );
  }
}