using System;
using System.Collections.Generic;
using ChamaJussa_API.Domains;
using Microsoft.EntityFrameworkCore;

namespace ChamaJussa_API.Contexts;

public partial class JussaCalls2Context : DbContext
{
    public JussaCalls2Context()
    {
    }

    public JussaCalls2Context(DbContextOptions<JussaCalls2Context> options)
        : base(options)
    {
    }

    public virtual DbSet<Fila> Fila { get; set; }

    public virtual DbSet<Localizacao> Localizacao { get; set; }

    public virtual DbSet<OrdemServico> OrdemServico { get; set; }

    public virtual DbSet<Status_OS> Status_OS { get; set; }

    public virtual DbSet<Usuario> Usuario { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {

//        optionsBuilder.UseSqlServer("Server=(localdb)\\MSSQLLocalDB;Database=JussaCalls2;Trusted_Connection=True;TrustServerCertificate=True;");
    }
//#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Fila>(entity =>
        {
            entity.HasKey(e => e.FilaID).HasName("PK__Fila__6E0F8A59AF24E1DA");

            entity.Property(e => e.NomeFila)
                .HasMaxLength(50)
                .IsUnicode(false);
        });

        modelBuilder.Entity<Localizacao>(entity =>
        {
            entity.HasKey(e => e.LocalizacaoID).HasName("PK__Localiza__83ABDECACA4D1030");

            entity.Property(e => e.Andar)
                .HasMaxLength(15)
                .IsUnicode(false);
            entity.Property(e => e.Nome)
                .HasMaxLength(50)
                .IsUnicode(false);
        });

        modelBuilder.Entity<OrdemServico>(entity =>
        {
            entity.HasKey(e => e.OS_ID).HasName("PK__OrdemSer__85A506ED81A76118");

            entity.Property(e => e.Descricao).HasMaxLength(255);
            entity.Property(e => e.Imagem).IsUnicode(false);
            entity.Property(e => e.NomeItem)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.dataCriacao).HasPrecision(0);

            entity.HasOne(d => d.Fila).WithMany(p => p.OrdemServico)
                .HasForeignKey(d => d.FilaID)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("OS_FilaID_FK");

            entity.HasOne(d => d.Localizacao).WithMany(p => p.OrdemServico)
                .HasForeignKey(d => d.LocalizacaoID)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("OS_Localizacao_FK");

            entity.HasOne(d => d.Status).WithMany(p => p.OrdemServico)
                .HasForeignKey(d => d.StatusID)
                .HasConstraintName("OS_Status_FK");

            entity.HasOne(d => d.usuarioSolicitanteNavigation).WithMany(p => p.OrdemServico)
                .HasForeignKey(d => d.usuarioSolicitante)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("OS_usuarioSolicitante_FK");
        });

        modelBuilder.Entity<Status_OS>(entity =>
        {
            entity.HasKey(e => e.StatusID).HasName("PK__Status_O__C8EE2043AEE983F5");

            entity.Property(e => e.NomeStatus).HasMaxLength(30);
        });

        modelBuilder.Entity<Usuario>(entity =>
        {
            entity.HasKey(e => e.UsuarioID).HasName("PK__Usuario__2B3DE7989F3998A8");

            entity.ToTable(tb => tb.HasTrigger("trg_Usuario_SoftDelete"));

            entity.HasIndex(e => e.Email, "UQ__Usuario__A9D10534FF5BE9A0").IsUnique();

            entity.HasIndex(e => e.NIF, "UQ__Usuario__C7DEC330F05C5805").IsUnique();

            entity.Property(e => e.UsuarioID).HasDefaultValueSql("(newid())");
            entity.Property(e => e.Email)
                .HasMaxLength(60)
                .IsUnicode(false);
            entity.Property(e => e.NIF)
                .HasMaxLength(11)
                .IsUnicode(false);
            entity.Property(e => e.Nome)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Senha).HasMaxLength(32);
            entity.Property(e => e.StatusUsuario).HasDefaultValue(true);
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
