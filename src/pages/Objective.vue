<template>
  <v-container>
    <v-card class="pa-3">

      Ce site est un comme un "jeu" pour moi, j'y fais ce que je veux, ce qu'il me plait tout en apprenant de nouvelle
      chose. <br>
      L'objectif premier de ce site est toujours d'apprendre de nouvelle chose et pas de rester sur ses acquis, cela
      va de soi que je pratique quotidiennement. <br>
      Mes objectifs pour ce site régulierement mirent à jour (pas dans l'ordre) :
      <v-card
        max-width="400"
        tile
      >
        <ul>
          <li
            v-for="objective, i in tasks"
            :key="i"
          >
            <strong>{{ objective }}</strong>
          </li>
        </ul>
      </v-card>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: 'objective',
  data: () => ({
    tasks: ['refact le router', 'Pouvoir supprimé son compte (désactiver)', 'Faire load les data tant qu\'ils ne sont pas dispo', 'Pouvoir récupérer son compte s\'il a été supprimé', 'Rajouter du content dans les détails (anime/manga)']
  })
}
</script>
